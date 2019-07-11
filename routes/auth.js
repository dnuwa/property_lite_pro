/* eslint-disable prettier/prettier */
import Router from 'express';
import signupController from '../controllers/signup';
import signinController from '../controllers/signin';
import {
  fieldValidation,
  validateNames,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateSignin,
} from '../middleware/authentication';

const authRouter = Router();

authRouter
  .route('/auth/signup')
  .post(fieldValidation, validateEmail, validateNames,
    validatePassword, validatePhoneNumber, signupController.signup);
authRouter.route('/auth/signup').get(signupController.allUsers);
authRouter.route('/auth/signin').post(validateSignin, signinController.signin);

module.exports = authRouter;
