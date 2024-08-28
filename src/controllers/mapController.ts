import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import createHttpError from '../helpers/createHttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import unzipArchive from '../services/unzipArchive.js';
import readFile from '../services/readFile.js';
import colorizeMap from '../services/colorizeMap.js';
import cloudinary from '../helpers/cloudinary.js';

const fileDestination = path.resolve('temp');
const mapDestination = path.resolve('public');

const createMap = async (req: Request, res: Response): Promise<void> => {
  const zipFilePath = path.resolve(`${fileDestination}/${req.file?.filename}`);
  const outputDir = path.resolve(`${fileDestination}`);
  let dirPath = '';
  let filePath = '';
  let coloredMapPath = '';
  try {
    const { outputDir: extractedDir, fileName } = await unzipArchive(
      zipFilePath,
      outputDir,
    );

    if (fileName) {
      dirPath = path.resolve(`${extractedDir}`);
      filePath = path.resolve(`${extractedDir}/${fileName}`);
      const baseMapPath = path.resolve(`${mapDestination}/empty-map.jpg`);
      const outputFilePath = path.resolve(`${mapDestination}/colored_map.jpg`);
      const fileData = readFile(filePath);
      const { newMapPath } = await colorizeMap(
        baseMapPath,
        fileData,
        outputFilePath,
      );

      if (!newMapPath) {
        throw createHttpError(404, 'File not found');
      } else {
        coloredMapPath = newMapPath;
        const { url: mapUrl } = await cloudinary.uploader.upload(newMapPath, {
          folder: 'sst_maps',
        });

        mapUrl.length > 0
          ? res.json({
              createdMap: mapUrl,
            })
          : createHttpError(404, 'File not found');
      }
    } else {
      throw createHttpError(404, 'File not found');
    }
  } catch (error) {
    throw createHttpError(400);
  } finally {
    await fs.unlink(zipFilePath);
    await fs.unlink(filePath);
    await fs.rmdir(dirPath);
    await fs.unlink(coloredMapPath);
  }
};
export default {
  createMap: ctrlWrapper(createMap),
};
