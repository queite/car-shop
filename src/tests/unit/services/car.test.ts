import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carCreateMock, carCreateWithErrorMock, carForUpdateMock, carForUpdateWithIdMock, carWithIdMock } from '../../mocks/carsMock';
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
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carForUpdateWithIdMock)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carWithIdMock)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car', () => {
    it('successfully', async () => {
      const carCreated = await carService.create(carCreateMock);

      expect(carCreated).to.be.deep.equal(carWithIdMock);
    });

    it('should fail if any data is invalid according to zod Schema', async () => {
      try {
        await carService.create(carCreateWithErrorMock);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  })

  describe('Get cars', () => {
    it('should get all cars', async () => {
      const cars = await carService.read();

      expect(cars).to.be.deep.equal([carWithIdMock]);
    })

    it('should get a car by ID', async () => {
      const car = await carService.readOne(carWithIdMock.id);
      // .onCall(0)
      expect(car).to.be.deep.equal(carWithIdMock);
    })

   it('should to throw the error "EntityNotFound" if ID is not found', async () => {
			try {
				// .onCall(1)
				await carService.readOne(carWithIdMock.id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
  })

  describe('Update car by ID', () => {
    it('successfully', async () => {
      const car = await carService.update(carForUpdateWithIdMock.id, carForUpdateMock);

      expect(car).to.be.deep.equal(carForUpdateWithIdMock);
    })

    it('should to throw the error "EntityNotFound" if ID is not found', async () => {
			try {
				await carService.update(carForUpdateWithIdMock.id, carForUpdateMock);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
  })

  describe('Delete car by ID', () => {
    it('successfully', async () => {
      const car = await carService.delete(carWithIdMock.id);

      expect(car).to.be.deep.equal(carWithIdMock);
    })

    it('should to throw the error "EntityNotFound" if ID is not found', async () => {
			try {
				await carService.delete(carWithIdMock.id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
  })

});