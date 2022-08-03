import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';

import { ErrorTypes } from '../../../errors/catalog';

import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';

import { motorcycleId, motorcycleMock, motorcycleMockAfterUpdate, motorcycleMockForUpdate, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle Service', () => {
	const motorcycleModel = new MotorcycleModel();
	const motorcycleService = new MotorcycleService(motorcycleModel);

	before(() => {
		/*
			pt-br:
				O método sinon.stub().resolves() substitui um método
				passado como parâmetro no stub e retorna o parâmetro
				de resolves. onCall() permite parâmetros diferentes no
				resolves a cada chamada do método substituido.
			en:
				The method sinon.stub().resolves() replaces a method
				passed as parameter to stub and returns the parameter
				in resolves. onCall() allows different parameters to
				resolves each time the replaced method is called.
		*/

		sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
		sinon.stub(motorcycleModel, 'readOne')
    .onCall(0).resolves(motorcycleMockWithId) 
    .onCall(1).resolves(null);
		sinon.stub(motorcycleModel, 'update')
    .onCall(0).resolves(motorcycleMockAfterUpdate)
    .onCall(1).resolves(null)
    .onCall(2).resolves(motorcycleMockAfterUpdate);
    sinon.stub(motorcycleModel, 'delete')
    .onCall(0).resolves(motorcycleMockAfterUpdate)
    .onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore()
	});

	describe('Creating a motorcycle', () => {
		it('Creation successful', async () => {
			const newMotorcycle = await motorcycleService.create(motorcycleMock);

			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});

		it('invalid motorcycle object', async () => {
			try {
				await motorcycleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('searching all motorcycles', async () => {
    it ('search successful', async () => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.an('array');
      expect(motorcycles[0]).to.be.deep.equal(motorcycleMockWithId);
    });
  });

	describe('Searching a motorcycle', () => {
		it('Search successful', async () => {
			const motorcycle = await motorcycleService.readOne(motorcycleId);

			expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
		it('Search fails', async () => {
			try {
				await motorcycleService.readOne(motorcycleId);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Updating a motorcycle', () => {
		it('Update successful', async () => {
		  const motorcycle = await motorcycleService.update(motorcycleId, motorcycleMockForUpdate);
		  expect(motorcycle).to.be.deep.equal(motorcycleMockAfterUpdate);
		});
    it('motorcycle not found', async () => {
			try {
				await motorcycleService.update(motorcycleId, motorcycleMockForUpdate);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
    it('Invalid motorcycle object', async () => {
      try {
				await motorcycleService.update(motorcycleId, {} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
    });

    describe('Deleting a motorcycle', async () => {
      it('Deletion successful', async () => {
        const deletedMotorcycle = await motorcycleService.delete(motorcycleId);
        expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockAfterUpdate);
      });
      it('motorcycle not found', async () => {
        try {
          await motorcycleService.delete(motorcycleId);
        } catch (error:any) {
          expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
        }
      });
    });
	});
});
