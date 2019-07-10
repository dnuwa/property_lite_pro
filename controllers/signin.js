/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import middleware from '../middleware';
import { users } from '../models';

exports.signin = (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      error: 'Email and Password are required !',
    });
  }

  // Get for the currently logged in user
  const returnUser = user => bcrypt.compareSync(password, user.password) && user.email === email;
  const userObject = users.find(returnUser);

  if (!userObject) {
    // Wrong password
    return res.status(401).json({
      status: 401,
      error: 'Wrong email or password',
    });
  }

  // return the JWT token for the future API calls
  return res.status(200).json({
    status: 200,
    data: {
      token: middleware.token(userObject.id),
      id: userObject.id,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
    },
  });
};
