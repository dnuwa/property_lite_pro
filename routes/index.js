const router = require('express').Router();
const signupController = require('../controllers/signup');
// const middleware = require('../middleware');

router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signup').get(signupController.allUsers);

module.exports = router;
