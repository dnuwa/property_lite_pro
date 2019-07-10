/* eslint-disable prettier/prettier */
import { Router } from 'express';
import adRouter from './ads';
import authRouter from './auth';


const prefix = '/api/v1';

const router = Router();
router.use(prefix, adRouter);
router.use(prefix, authRouter);

module.exports = router;
