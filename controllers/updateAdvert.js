/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { adverts } from '../models';

import {
  currentUser, loggedinUser, checkAdvertId, checkAdvert,
} from '../helpers/utilities';

exports.updateAdvert = (req, res) => {
  const {
    body: {
      status, type, state, city, address, price, imageUrl, description,
    }, params: { propertyId },
  } = req;

  const activeUser = currentUser(req.userId);
  loggedinUser(activeUser, res);

  const advertObject = checkAdvert(propertyId);

  checkAdvertId(advertObject, propertyId, res);

  if (activeUser.id !== advertObject.created_by_staffId) {
    return res.status(401).json({
      status: 401,
      message: 'unauthorised access',
      error: `you are not authorised to update proprty Id: ${propertyId}`,
    });
  }

  const newAdvertObject = {
    id: advertObject.id,
    status: status || advertObject.Status,
    description: description || advertObject.Description,
    type: type || advertObject.Type,
    state: state || advertObject.State,
    city: city || advertObject.City,
    address: address || advertObject.Address,
    price: price || advertObject.Price,
    imageUrl: imageUrl || advertObject.Image,
    created_on: advertObject.created_on,
    created_by_staffId: activeUser.id,
    created_by_staffName: activeUser.firstName,
  };

  let index = null;
  adverts.forEach((advert, i) => {
    if (advert.propertyId === Number(propertyId)) {
      index = i;
    }
  });

  adverts.splice(index, 1, newAdvertObject);

  return res.status(200).json({
    status: 200,
    message: 'success',
    data: newAdvertObject,
  });
};

// mark a property as sold
exports.markSold = (req, res) => {
  const { body: { newStatus }, params: { propertyId } } = req;

  const activeUser = currentUser(req.userId);
  loggedinUser(activeUser, res);

  const advertObject = checkAdvert(propertyId);

  checkAdvertId(advertObject, propertyId, res);

  const soldObj = {
    id: advertObject.id,
    status: newStatus,
    description: advertObject.Description,
    type: advertObject.Type,
    state: advertObject.State,
    city: advertObject.City,
    address: advertObject.Address,
    price: advertObject.Price,
    imageUrl: advertObject.Image,
    created_on: advertObject.created_on,
    created_by_staffId: activeUser.id,
    created_by_staffName: activeUser.firstName,
  };

  let index = null;
  adverts.forEach((advert, i) => {
    if (advert.propertyId === Number(propertyId)) {
      index = i;
    }
  });

  adverts.splice(index, 1, soldObj);

  return res.status(200).json({
    status: 200,
    message: 'success',
    data: soldObj,
  });
};
