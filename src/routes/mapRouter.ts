import express from 'express';
import mapController from '../controllers/mapController.js';
import uploadArchive from '../middlewares/uploadArchive.js';
import checkContentType from '../middlewares/checkContentType.js';
import checkFileIsUploaded from '../middlewares/checkFileIsUploaded.js';

const mapRouter = express.Router();

mapRouter.post(
  '/create',
  checkContentType,
  uploadArchive.single('archive'),
  checkFileIsUploaded,
  mapController.createMap,
);

export default mapRouter;
