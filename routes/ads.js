/* eslint-disable import/no-duplicates */
import Router from 'express';

import fileupload from 'express-fileupload';
import advertController from '../controllers/adverts';
import addeleteController from '../controllers/deleteAdvert';
import searchController from '../controllers/searchAdverts';
import updateController from '../controllers/updateAdvert';
import markAsSoldcontroller from '../controllers/updateAdvert';
import middleware from '../middleware';

const adRouter = Router();

adRouter.use(fileupload({ useTempFiles: true }));
adRouter.route('/property').post(middleware.verifyToken, advertController.createAdvert);
adRouter.route('/property').get(advertController.allAdverts);
adRouter
  .route('/property/:propertyId')
  .get(advertController.singleAdvert)
  .delete(middleware.verifyToken, addeleteController.deleteAdvert)
  .patch(middleware.verifyToken, updateController.updateAdvert);

adRouter.route('/property/type/:type').get(searchController.searchAdvert);
adRouter.route('/property/:propertyId/sold').patch(middleware.verifyToken, markAsSoldcontroller.markSold);

module.exports = adRouter;
