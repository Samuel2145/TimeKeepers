import express from 'express';
import * as Algo from '../Controllers/AlgoController.js';

const AlgoRouter = express.Router();

AlgoRouter.get('/newSchedule', Algo.GenerateSchedule);

export default AlgoRouter;