import express from 'express';
import * as Algo from '../Controllers/AlgoController.js';

const AlgoRouter = express.Router();

//AlgoRouter.post('/create', Algo.createRoster);
AlgoRouter.get('/test', Algo.AlgoTest);

export default AlgoRouter;