const authRouter = require('express').Router();
const signupController = require('../controllers/signup');
const signinController = require('../controllers/signin');

authRouter.route('/auth/signup').post(signupController.signup);
authRouter.route('/auth/signup').get(signupController.allUsers);
authRouter.route('/auth/signin').post(signinController.signin);

module.exports = authRouter;
