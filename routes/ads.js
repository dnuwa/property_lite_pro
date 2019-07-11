/* eslint-disable import/no-duplicates */
import Router from 'express';

import advertController from '../controllers/adverts';
import addeleteController from '../controllers/deleteAdvert';
import searchController from '../controllers/searchAdverts';
import updateController from '../controllers/updateAdvert';
import markAsSoldcontroller from '../controllers/updateAdvert';
import middleware from '../middleware';
import { validateEmptyFields, validatePrice, validateStatus } from '../middleware/property';

const adRouter = Router();

adRouter
  .route('/property')
  .post(middleware.verifyToken, validateEmptyFields, validatePrice, advertController.createAdvert);
adRouter.route('/property').get(advertController.allAdverts);
adRouter
  .route('/property/:propertyId')
  .get(advertController.singleAdvert)
  .delete(middleware.verifyToken, addeleteController.deleteAdvert)
  .patch(middleware.verifyToken, validatePrice, updateController.updateAdvert);

adRouter.route('/property/type/:type').get(searchController.searchAdvert);
adRouter
  .route('/property/:propertyId/sold')
  .patch(middleware.verifyToken, validateStatus, markAsSoldcontroller.markSold);

module.exports = adRouter;
