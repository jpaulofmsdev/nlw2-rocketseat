import express from 'express';
import ClassController from './controller/ClassController';
import ConnectionController from './controller/ConnectionController';

const routes = express.Router();

//Classes
const classController = new ClassController();

routes.post('/classes', classController.create);
routes.get('/classes', classController.index);

//Connections
const connectionController = new ConnectionController();

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);

export default routes;