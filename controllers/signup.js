/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import middleware from '../middleware';
import { users } from '../models';

// create user account
exports.signup = (req, res) => {
  const {
    email, firstName, lastName, password, phoneNumber, address, isAdmin,
  } = req.body;

  const fisrtN = firstName.trim();
  const lastN = lastName.trim();
  const elMail = email.trim();
  const phoneN = phoneNumber.trim();
  const addre = address.trim();
  const admin = isAdmin;

  // generate user id basing on list length
  const userId = users.length + 1;

  // hashpassword
  const hashedPassword = bcrypt.hashSync(password, 8);

  // capture data
  const data = {
    id: userId,
    email: elMail,
    firstName: fisrtN,
    lastName: lastN,
    password: hashedPassword,
    phoneNumber: phoneN,
    address: addre,
    is_admin: admin,

  };
  const doesEmailAlreadyExist = users.some(user => user.email === data.email);
  if (doesEmailAlreadyExist) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Email already exists, try another',
    });
  }
  users.push(data);

  // return the JWT token for the future API calls
  return res.status(200).json({
    status: 201,
    message: 'user created',
    data: {
      token: middleware.token(data.id),
    },
  });
};

exports.allUsers = (req, res) => res.status(200).json({
  status: 200,
  message: 'success',
  data: users,
});
