import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { carId, carMock, carMockAfterUpdate, carMockForUpdate, carMockWithId } from '../../mocks/carMock';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import CarModel from '../../../models/Car';

describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  // fazemos o cast de um objeto para um `Request` pois nosso controller só vai aceitar um objeto do tipo `Request` como primeiro parâmetro
  const req = {} as Request; 
  // o mesmo acontece com o segundo parâmetro
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read')
    .onCall(0).resolves([carMockWithId])
    .onCall(1).resolves([]);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockAfterUpdate);
    sinon.stub(carService, 'delete').resolves(carMockAfterUpdate);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Creating a car', () => {
    it('Creation successful', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('searching all cars', async () => {
    it ('found an array of cars', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
    it ('found no cars', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([])).to.be.true;
    });
  });

  describe('searching a car', async () => {
    it ('search successful', async () => {
      req.params = { id: carId };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('updating a car', async () => {
    it('update successful', async () => {
      req.params = { id: carId };
      req.body = carMockForUpdate;
      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockAfterUpdate)).to.be.true;
    });
  });

  describe('deleting a car', async () => {
    it('deletion successful', async () => {
      req.params = { id: carId };
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
}); 