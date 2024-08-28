import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

const unzipArchive = async (
  zipFilePath: string,
  outputDir: string,
): Promise<{ outputDir: string; fileName: string | null }> => {
  const archiveName = path.basename(zipFilePath, path.extname(zipFilePath));

  const newOutputDir = path.join(outputDir, `unzip_${archiveName}`);

  if (!fs.existsSync(newOutputDir)) {
    fs.mkdirSync(newOutputDir, { recursive: true });
  }

  let rootFileName: string | null = null;

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Parse())
      .on('entry', (entry) => {
        const entryPath = entry.path;
        const entryName = path.basename(entryPath);
        const isRootFile = path.dirname(entryPath) === '.';
        const isSystemDirectory = entryPath.startsWith('__MACOSX');

        if (isRootFile && !isSystemDirectory && entry.type === 'File') {
          rootFileName = entryName;
          const filePath = path.join(newOutputDir, entryPath);
          entry.pipe(fs.createWriteStream(filePath));
        } else {
          entry.autodrain();
        }
      })
      .on('close', resolve)
      .on('error', reject);
  });

  return { outputDir: newOutputDir, fileName: rootFileName };
};

export default unzipArchive;
