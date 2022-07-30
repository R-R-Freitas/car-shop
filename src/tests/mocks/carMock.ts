import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carId = '4edd40c86762e0fb12000003';


const carMockWithId: ICar & { _id: string } = {
  _id: carId,
  ...carMock,
}

const carMockForUpdate: ICar = {
  model: 'Fusca',
  year: 1962,
  color: 'blue',
  buyValue: 450000,
  seatsQty: 5,
  doorsQty: 2
}

const carMockAfterUpdate: ICar & { _id: string } = {
  _id: carId,
  ...carMockForUpdate,
}

export {
  carId,
  carMock,
  carMockWithId,
  carMockForUpdate,
  carMockAfterUpdate,
}