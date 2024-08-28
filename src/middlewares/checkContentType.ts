import { Request, Response, NextFunction } from 'express';
import createHttpError from '../helpers/createHttpError.js';

const checkContentType = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.is('multipart/form-data')) {
    return next(
      createHttpError(400, 'Content-Type must be multipart/form-data'),
    );
  }
  next();
};

export default checkContentType;
