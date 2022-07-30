import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';

import CarModel from '../../../models/Car'
import { carId, carMock, carMockAfterUpdate, carMockForUpdate, carMockWithId } from '../../mocks/carMock';

describe('Car Model', () => {

  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockAfterUpdate);
    sinon.stub(Model, 'findByIdAndRemove').resolves(carMockAfterUpdate);
  });

  after(()=>{
    sinon.restore();
  });

  describe('creating a car', async () => {
    it('creation successfull', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching all cars', async () => {
    it ('search successfull', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.an('array');
      expect(cars[0]).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching a car', async () => {
    it ('search successfull', async () => {
      const car = await carModel.readOne(carId);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it ('invalid _id', async () => {
      try{
        await carModel.readOne('ONONONONON');
      } catch (err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('updating a car', async () => {
    it('update successfull', async () => {
      const car = await carModel.update(carId, carMockForUpdate);
      expect(car).to.be.deep.equal(carMockAfterUpdate);
    });

    it('invalid _id', async () => {
      try{
        await carModel.update('ONONONONON', carMockForUpdate);
      } catch(err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('deleting a car', async () => {
    it('delete successfull', async () => {
      const deletedCar = await carModel.delete(carId);
      expect(deletedCar).to.be.deep.equal(carMockAfterUpdate);
    });

    it('invalid _id', async () => {
      try{
        await carModel.delete('ONONONONON');
      } catch(err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});
