import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carWithIdMock, createCarMock, createWithErrorCarMock } from '../../mocks/carsMock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Cars service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carWithIdMock);
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


});