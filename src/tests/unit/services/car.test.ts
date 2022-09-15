import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMockForUpdate, carMockForUpdateWithId, carWithIdMock, createCarMock, createWithErrorCarMock } from '../../mocks/carsMock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Cars service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carWithIdMock);
    sinon.stub(carModel, 'read').resolves([carWithIdMock]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carWithIdMock)
      .onCall(1).resolves(null)
    sinon.stub(carModel, 'update').resolves(carMockForUpdateWithId);
    sinon.stub(carModel, 'delete').resolves(carWithIdMock);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car', () => {
    it('successfully', async () => {
      const carCreated = await carService.create(createCarMock);

      expect(carCreated).to.be.deep.equal(carWithIdMock);
    });

    it('failure', async () => {
      let err: any;

      try {
        await carService.create(createWithErrorCarMock);
      } catch (error) {
        err = error;
      }

      expect(err).to.be.instanceOf(ZodError);
    });
  })

  describe('Get cars', () => {
    it('should get all cars', async () => {
      const cars = await carService.read();

      expect(cars).to.be.deep.equal([carWithIdMock]);
    })

    it('should get a car by ID', async () => {
      const car = await carService.readOne(carWithIdMock._id);
      // .onCall(0)
      expect(car).to.be.deep.equal(carWithIdMock);
    })

   it('should to throw the error "EntityNotFound" if ID is not found', async () => {
			try {
				// .onCall(1)
				await carService.readOne(carWithIdMock._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
  })

  // describe('Update car by ID', () => {
  //   it('successfully', async () => {
  //     const car = await carService.update(carMockForUpdateWithId.id, carMockForUpdate);

  //     expect(car).to.be.deep.equal(carMockForUpdateWithId);
  //   })
  // })

  // describe('Delete car by ID', () => {
  //   it('successfully', async () => {
  //     const car = await carService.delete(carWithIdMock._id);

  //     expect(car).to.be.deep.equal(carWithIdMock);
  //   })
  // })

});