const router = require('express').Router();
const signupController = require('../controllers/signup');
const signinController = require('../controllers/signin');
const createAdvertController = require('../controllers/createAdvert');
const middleware = require('../middleware');

router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signup').get(signupController.allUsers);
router.route('/auth/signin').post(signinController.signin);
router.route('/property').post(middleware.verifyToken, createAdvertController.createAdvert);

module.exports = router;
