/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
const { adverts } = require('../models');
const { checkUserType, currentUser, checkadvert } = require('../helpers/utilities');

const datetime = new Date();

exports.createAdvert = (req, res) => {
  const {
    status, type, state, city, address, price, imageUrl,
  } = req.body;

  if (!status || !type || !state || !city || !address || !price || !imageUrl) {
    return res.status(400).json({
      status: 400,
      error: 'status, type, state, city, address, price and imageUrl are required !',
    });
  }
  const activeUser = currentUser(req.userId);

  if (checkUserType(activeUser, res)) {
    return checkUserType(activeUser, res);
  }

  const advertId = adverts.length + 1;
  const data = {
    propertyId: advertId,
    timestamp: datetime,
    propertyStatus: status,
    propertyType: type,
    propertyState: state,
    propertyCity: city,
    propertyAddress: address,
    propertyPrice: price,
    propertyImage: imageUrl,
    staffId: activeUser.id,
    staffName: activeUser.firstName,
  };

  adverts.push(data);

  return res.status(201).json({
    status: 201,
    data: {
      propertyId: data.propertyId,
      timestamp: data.timestamp,
      staffId: data.staffId,
      staffName: data.staffName,
      propertyStatus: data.propertyStatus,
      propertyType: data.propertyType,
      propertyState: data.propertyState,
      propertyCity: data.propertyCity,
      propertyAddress: data.propertyAddress,
      propertyPrice: data.propertyPrice,
      propertyImage: data.propertyImage,
    },
  });
};

exports.allAdverts = (req, res) => res.status(200).json({
  status: 200,
  data: adverts,
});

exports.singleAdvert = (req, res) => {
  const { params: { propertyId } } = req;

  const advertObj = checkadvert(propertyId);
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