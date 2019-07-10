/* eslint-disable prettier/prettier */
const { Router } = require('express');
const adRouter = require('./ads');
const authRouter = require('./auth');


const prefix = '/api/v1';

const router = Router();
router.use(prefix, adRouter);
router.use(prefix, authRouter);

module.exports = router;
