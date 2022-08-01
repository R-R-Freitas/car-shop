import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';

const route = Router();
const path = '/motorcycles';

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post(
  path,
  (req, res) => motorcycleController.create(req, res),
);
route.get(
  path,
  (req, res) => motorcycleController.read(req, res),
);
route.get(
  `${path}/:id`,
  (req, res) => motorcycleController.readOne(req, res),
);
route.put(
  `${path}/:id`,
  (req, res) => motorcycleController.update(req, res),
);
route.delete(
  `${path}/:id`,
  (req, res) => motorcycleController.delete(req, res),
);

export default route;