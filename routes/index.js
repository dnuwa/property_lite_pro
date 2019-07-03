const router = require('express').Router();
const signupController = require('../controllers/signup');
const signinController = require('../controllers/signin');
const advertController = require('../controllers/adverts');
const addeleteController = require('../controllers/deleteAdvert');
const searchController = require('../controllers/searchAdverts');
const updateController = require('../controllers/updateAdvert');
const middleware = require('../middleware');

router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signup').get(signupController.allUsers);
router.route('/auth/signin').post(signinController.signin);
router.route('/property').post(middleware.verifyToken, advertController.createAdvert);
router.route('/property').get(advertController.allAdverts);
router
  .route('/property/:propertyId')
  .get(advertController.singleAdvert)
  .delete(middleware.verifyToken, addeleteController.deleteAdvert)
  .patch(middleware.verifyToken, updateController.updateAdvert);

router.route('/property/type/:type').get(searchController.searchAdvert);

module.exports = router;
