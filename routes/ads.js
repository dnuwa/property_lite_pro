const adRouter = require('express').Router();

const advertController = require('../controllers/adverts');
const addeleteController = require('../controllers/deleteAdvert');
const searchController = require('../controllers/searchAdverts');
const updateController = require('../controllers/updateAdvert');
const markAsSoldcontroller = require('../controllers/updateAdvert');
const middleware = require('../middleware');

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
