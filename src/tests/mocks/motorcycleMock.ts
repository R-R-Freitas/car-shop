import { IMotorcycle } from '../../interfaces/IMotorcycle';

const motorcycleMock: IMotorcycle = {
  model: 'Shuriken',
  year: 1991,
  color: 'white',
  buyValue: 320000,
  category: 'Street',
  engineCapacity: 400
}

const motorcycleId = '4edd40c86762e0fb12000003';


const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: motorcycleId,
  ...motorcycleMock,
}

const motorcycleMockForUpdate: IMotorcycle = {
  model: 'Diablo',
  year: 1991,
  color: 'red',
  buyValue: 2500000,
  category: 'Custom',
  engineCapacity: 1000
}

const motorcycleMockAfterUpdate: IMotorcycle & { _id: string } = {
  _id: motorcycleId,
  ...motorcycleMockForUpdate,
}

export {
  motorcycleId,
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockForUpdate,
  motorcycleMockAfterUpdate,
}