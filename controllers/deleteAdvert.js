/* eslint-disable prettier/prettier */
const { adverts } = require('../models');
const { currentUser, checkAdvert } = require('../helpers/utilities');


exports.deleteAdvert = (req, res) => {
  const {
    params: { propertyId },
  } = req;

  const loggedinUser = currentUser(req.userId);

  if (!loggedinUser) {
    return res.status(401).json({
      status: 401,
      error: 'Token is expired, please login again!',
    });
  }

  const advertToDelete = checkAdvert(propertyId);


  if (!advertToDelete) {
    return res.status(400).json({
      status: 400,
      error: `There is no property with Id: ${propertyId}`,
    });
  }

  // Delete only if you are the creator of the advert
  if (loggedinUser.id !== advertToDelete.staffId) {
    return res.status(401).json({
      status: 401,
      error: `you are not authorised to delete proprty Id: ${propertyId}`,
    });
  }

  // Check for advert with the provided propertyid
  let index = null;
  adverts.forEach((advert, i) => {
    if (advert.propertyId === Number(propertyId)) {
      index = i;
    }
  });

  // Delete bank adverts
  adverts.splice(index, 1);
  // Return adverts details
  return res.status(202).json({
    status: 202,
    data: {
      message: `Advert with Id: ${propertyId} has been successfuly deleted`,
    },
  });
};
