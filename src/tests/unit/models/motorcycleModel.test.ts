import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';

import MotorcycleModel from '../../../models/Motorcycle'
import { motorcycleId, motorcycleMock, motorcycleMockAfterUpdate, motorcycleMockForUpdate, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle Model', () => {

  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockAfterUpdate);
    sinon.stub(Model, 'findByIdAndRemove').resolves(motorcycleMockAfterUpdate);
  });

  after(()=>{
    sinon.restore();
  });

  describe('creating a motorcycle', async () => {
    it('creation successful', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching all motorcycles', async () => {
    it ('search successful', async () => {
      const motorcycles = await motorcycleModel.read();
      expect(motorcycles).to.be.an('array');
      expect(motorcycles[0]).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching a motorcycle', async () => {
    it ('search successful', async () => {
      const motorcycle = await motorcycleModel.readOne(motorcycleId);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it ('invalid _id', async () => {
      try{
        await motorcycleModel.readOne('ONONONONON');
      } catch (err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('updating a motorcycle', async () => {
    it('update successful', async () => {
      const motorcycle = await motorcycleModel.update(motorcycleId, motorcycleMockForUpdate);
      expect(motorcycle).to.be.deep.equal(motorcycleMockAfterUpdate);
    });

    it('invalid _id', async () => {
      try{
        await motorcycleModel.update('ONONONONON', motorcycleMockForUpdate);
      } catch(err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('deleting a motorcycle', async () => {
    it('deletion successful', async () => {
      const deletedMotorcycle = await motorcycleModel.delete(motorcycleId);
      expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockAfterUpdate);
    });

    it('invalid _id', async () => {
      try{
        await motorcycleModel.delete('ONONONONON');
      } catch(err: any) {
        expect(err.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});
