import { Request, Response, NextFunction } from 'express';
import createHttpError from '../helpers/createHttpError.js';

const checkFileIsUploaded = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return next(createHttpError(400, 'File not upload'));
  }
  next();
};

export default checkFileIsUploaded;
