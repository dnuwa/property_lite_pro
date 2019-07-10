import Router from 'express';
import signupController from '../controllers/signup';
import signinController from '../controllers/signin';

const authRouter = Router();

authRouter.route('/auth/signup').post(signupController.signup);
authRouter.route('/auth/signup').get(signupController.allUsers);
authRouter.route('/auth/signin').post(signinController.signin);

module.exports = authRouter;
