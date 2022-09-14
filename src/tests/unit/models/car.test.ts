import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carWithIdMock, createCarMock } from '../../mocks/carsMock';
import CarModel from '../../../models/Car';
const { expect } = chai;

describe('Model Cars', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carWithIdMock);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car', () => {
    it('successfully', async () => {
      const newCar = await carModel.create(createCarMock);
      expect(newCar).to.be.deep.eq(carWithIdMock);
    });
  })


});