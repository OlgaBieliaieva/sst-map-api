import multer, { StorageEngine, FileFilterCallback, Multer } from 'multer';
import path from 'path';
import { Request } from 'express';
import createHttpError from '../helpers/createHttpError.js';

const destination = path.resolve('temp');

const storage: StorageEngine = multer.diskStorage({
  destination,
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const extension = file.originalname.split('.').pop();
  const allowedFileTypes = [
    'application/x-zip-compressed',
    'application/octet-stream',
    'application/zip',
  ];
  const allowedExtensions = ['.zip'];
  const fileExtension = path.extname(file.originalname);
  const isValidFileType = allowedFileTypes.includes(file.mimetype);
  const isValidFileExtension = allowedExtensions.includes(fileExtension);

  if (isValidFileType && isValidFileExtension) {
    callback(null, true);
  } else {
    return callback(createHttpError(400, `.${extension} extension not allow`));
  }
};

const uploadArchive: Multer = multer({
  storage,
  fileFilter,
});

export default uploadArchive;
