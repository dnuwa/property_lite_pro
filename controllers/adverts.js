/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { adverts } from '../models';
import {
  checkUserType, currentUser, checkAdvert, datetime,
} from '../helpers/utilities';

// post a property advert
exports.createAdvert = (req, res) => {
  const {
    status, type, state, city, address, price, imageUrl, description,
  } = req.body;

  const activeUser = currentUser(req.userId);

  if (checkUserType(activeUser, res)) {
    return checkUserType(activeUser, res);
  }

  const advertId = adverts.length + 1;
  const propertyAdvert = {
    id: advertId,
    Status: status,
    Description: description,
    Type: type,
    State: state,
    City: city,
    Address: address,
    Price: price,
    Image: imageUrl,
    created_on: datetime,
    created_by_staffId: activeUser.id,
    created_by_staffName: activeUser.firstName,
  };

  const propertyExist = adverts.some(advert => advert.Description === propertyAdvert.Description);
  if (propertyExist) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Property with same description exists',
    });
  }

  adverts.push(propertyAdvert);

  return res.status(201).json({
    status: 201,
    message: 'created successfully',
    data: propertyAdvert,
  });
};

// returns all posted adverts
exports.allAdverts = (req, res) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    const availableProperties = adverts.filter(obj => obj.Status === 'available');
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: availableProperties,
    });
  }

  return res.status(200).json({
    status: 200,
    message: 'success',
    data: adverts,
  });
};

// returns a single property advert
exports.singleAdvert = (req, res) => {
  const { params: { propertyId } } = req;

  const advertObj = checkAdvert(propertyId);
  if (!advertObj) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: `There is no property with Id: ${propertyId}`,

    });
  }

  return res.status(200).json({
    status: 200,
    message: 'success',
    data: advertObj,

  });
};
