/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import middleware from '../middleware';
import { users } from '../models';
import {
  checkName, checkEmail, checkPassword, checkPhoneNumber, checkEmptyFields,
} from '../helpers/validators';

// create user account
exports.signup = (req, res) => {
  const {
    email, firstName, lastName, password, phoneNumber, address, isAdmin,
  } = req.body;

  if (checkEmptyFields(email, password, lastName, firstName, phoneNumber, res)) {
    return checkEmptyFields(email, password, lastName, firstName, phoneNumber, res);
  }

  const fisrtN = firstName.trim();
  const lastN = lastName.trim();
  const elMail = email.trim();
  const phoneN = phoneNumber.trim();
  const addre = address.trim();
  const admin = isAdmin;


  if (checkName(fisrtN, lastN, res)) {
    return checkName(fisrtN, lastN, res);
  }

  // Validate email
  if (checkEmail(elMail, res)) {
    return checkEmail(email, res);
  }

  // Validate password
  if (checkPassword(password, res)) {
    return checkPassword(password, res);
  }

  if (checkPhoneNumber(phoneN, res)) {
    return checkPhoneNumber(phoneN, res);
  }

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
      error: 'Email already exists, try another',
    });
  }
  users.push(data);

  // return the JWT token for the future API calls
  return res.status(200).json({
    status: 200,
    data: {
      token: middleware.token(data.id),
      id: data.id,
      firstName: data.firstName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      is_admin: data.is_admin,
    },
  });
};

exports.allUsers = (req, res) => res.status(200).json({
  status: 200,
  data: users,
});
