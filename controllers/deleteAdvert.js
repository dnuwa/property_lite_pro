/* eslint-disable prettier/prettier */
import { adverts } from '../models';
import { currentUser, checkAdvert } from '../helpers/utilities';


exports.deleteAdvert = (req, res) => {
  const {
    params: { propertyId },
  } = req;

  const loggedinUser = currentUser(req.userId);

  if (!loggedinUser) {
    return res.status(401).json({
      status: 401,
      messsage: 'unauthorised access',
      error: 'Token is expired, please login again!',
    });
  }

  const advertToDelete = checkAdvert(propertyId);


  if (!advertToDelete) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: `There is no property with Id: ${propertyId}`,
    });
  }

  // Delete only if you are the creator of the advert
  if (loggedinUser.id !== advertToDelete.created_by_staffId) {
    return res.status(401).json({
      status: 401,
      message: 'unauthorised access',
      error: `you are not authorised to delete proprty Id: ${propertyId}`,
    });
  }

  // Check for advert with the provided propertyid
  let index = null;
  adverts.forEach((advert, i) => {
    if (advert.id === Number(propertyId)) {
      index = i;
    }
  });

  // Delete propert adverts
  adverts.splice(index, 1);
  // Return adverts details
  return res.status(202).json({
    status: 202,
    message: 'succefully deleted',
    data: `Advert with Id: ${propertyId} has been successfuly deleted`,

  });
};
