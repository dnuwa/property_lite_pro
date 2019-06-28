const router = require('express').Router();
const signupController = require('../controllers/signup');
const signinController = require('../controllers/signin');
// const middleware = require('../middleware');

router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signup').get(signupController.allUsers);
router.route('/auth/signin').post(signinController.signin);

module.exports = router;
