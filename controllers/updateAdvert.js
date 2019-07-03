/* eslint-disable prettier/prettier */
const { adverts } = require('../models');
// const { checkAdEmptyFileds } = require('../helpers/validators');
const {
  currentUser, loggedinUser, checkAdvertId, checkAdvert,
} = require('../helpers/utilities');

exports.updateAdvert = (req, res) => {
  const {
    body: {
      status, type, state, city, address, price, imageUrl,
    }, params: { propertyId },
  } = req;

  const activeUser = currentUser(req.userId);
  loggedinUser(activeUser, res);

  const advertObject = checkAdvert(propertyId);

  checkAdvertId(advertObject, propertyId, res);

  const newAdvertObject = {
    id: advertObject.id,
    status: status || advertObject.Status,
    type: type || advertObject.Type,
    state: state || advertObject.Ttate,
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
    data: newAdvertObject,
  });
};
