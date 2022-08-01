import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';

import { ErrorTypes } from '../../../errors/catalog';

import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';

import { carId, carMock, carMockAfterUpdate, carMockForUpdate, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
		sinon.stub(carModel, 'readOne')
    .onCall(0).resolves(carMockWithId) 
    .onCall(1).resolves(null)
		sinon.stub(carModel, 'update')
    .onCall(0).resolves(carMockAfterUpdate)
    .onCall(1).resolves(null)
    .onCall(2).resolves(carMockAfterUpdate);
    sinon.stub(carModel, 'delete')
    .onCall(0).resolves(carMockAfterUpdate)
    .onCall(1).resolves(null)
	});

	after(() => {
		sinon.restore()
	});

	describe('Creating a car', () => {
		it('Creation successful', async () => {
			const newCar = await carService.create(carMock);

			expect(newCar).to.be.deep.equal(carMockWithId);
		});

		it('invalid car object', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('searching all cars', async () => {
    it ('search successful', async () => {
      const cars = await carService.read();
      expect(cars).to.be.an('array');
      expect(cars[0]).to.be.deep.equal(carMockWithId);
    });
  });

	describe('Searching a car', () => {
		it('Search successful', async () => {
			const car = await carService.readOne(carId);

			expect(car).to.be.deep.equal(carMockWithId);
		});
		it('Search fails', async () => {
			try {
				await carService.readOne(carId);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Updating a car', () => {
		it('Update successful', async () => {
		  const car = await carService.update(carId, carMockForUpdate);
		  expect(car).to.be.deep.equal(carMockAfterUpdate);
		});
    it('Car not found', async () => {
			try {
				await carService.update(carId, carMockForUpdate);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
    it('Invalid car object', async () => {
      try {
				await carService.update(carId, {} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
    });

    describe('Deleting a car', async () => {
      it('Deletion successful', async () => {
        const deletedCar = await carService.delete(carId);
        expect(deletedCar).to.be.deep.equal(carMockAfterUpdate);
      });
      it('Car not found', async () => {
        try {
          await carService.delete(carId);
        } catch (error:any) {
          expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
        }
      });
    });
	});
});

