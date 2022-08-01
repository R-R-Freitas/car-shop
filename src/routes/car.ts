import { Router } from 'express';
import CarController from '../controllers/Car';
import CarService from '../services/Car';
import CarModel from '../models/Car';

const route = Router();
const path = '/cars';

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post(path, (req, res) => carController.create(req, res));
route.get(path, (req, res) => carController.read(req, res));
route.get(`${path}/:id`, (req, res) => carController.readOne(req, res));
route.put(`${path}/:id`, (req, res) => carController.update(req, res));
route.delete(`${path}/:id`, (req, res) => carController.delete(req, res));

export default route;