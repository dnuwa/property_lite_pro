/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
const { adverts } = require('../models');

exports.searchAdvert = (req, res) => {
  const { params: { type } } = req;

  const filteredData = adverts.filter(obj => obj.propertyType === type);
  return res.status(200).json({
    status: 200,
    data: filteredData,
  });
};
