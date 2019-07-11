/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { adverts } from '../models';
import {
  checkUserType, currentUser, checkAdvert, datetime,
} from '../helpers/utilities';
import { checkAdEmptyFileds, checkPrice } from '../helpers/validators';


exports.createAdvert = (req, res) => {
  const {
    status, type, state, city, address, price, imageUrl,
  } = req.body;

  checkAdEmptyFileds(status, type, state, city, address, price, imageUrl, res);


  const activeUser = currentUser(req.userId);

  if (checkUserType(activeUser, res)) {
    return checkUserType(activeUser, res);
  }

  checkPrice(price, res);
  const advertId = adverts.length + 1;
  const propertyAdvert = {
    id: advertId,
    Status: status,
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

  adverts.push(propertyAdvert);

  return res.status(201).json({
    status: 201,
    data: propertyAdvert,
  });
};

exports.allAdverts = (req, res) => res.status(200).json({
  status: 200,
  data: adverts,
});

exports.singleAdvert = (req, res) => {
  const { params: { propertyId } } = req;

  const advertObj = checkAdvert(propertyId);
  if (!advertObj) {
    return res.status(400).json({
      status: 400,
      data: {
        message: `There is no property with Id: ${propertyId}`,
      },
    });
  }

  return res.status(200).json({
    status: 200,
    data: advertObj,

  });
};
