import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { carMockForUpdate, carMockForUpdateWithId, carWithIdMock, createCarMock } from '../../mocks/carsMock';
const { expect } = chai;

describe('Cars controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService)

  // req vai ser um objeto com cast de Request, pois o controller só aceita um Request como primeiro parâmetro
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carWithIdMock);
    sinon.stub(carService, 'read').resolves([carWithIdMock]);
    sinon.stub(carService, 'readOne').resolves(carWithIdMock);
    // sinon.stub(carService, 'update').resolves(carMockForUpdateWithId);
    // sinon.stub(carService, 'delete').resolves(carMockForUpdateWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car', () => {
    it('successfully', async () => {
      req.body = createCarMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carWithIdMock)).to.be.true;
    });
  })

  describe('Get cars', () => {
    it('successfully get all cars', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([carWithIdMock])).to.be.true;
    });

    it('successfully get car by ID', async () => {
      req.params = { id: carWithIdMock._id };
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carWithIdMock)).to.be.true;
    });
  })

  // describe('Update car by ID', () => {
  //   it('successfully update a car', async () => {
  //     req.body = carMockForUpdate
  //     req.params = { id: carMockForUpdateWithId.id };
  //     await carController.update(req, res);

  //     const statusStub = res.status as sinon.SinonStub
  //     const jsonStub = res.json as sinon.SinonStub

  //     expect(statusStub.calledWith(200)).to.be.true;
  //     expect(jsonStub.calledWith(carMockForUpdateWithId)).to.be.true;
  //   });
  // })

  // describe('Delete car by ID', () => {
  //   it('successfully delete a car', async () => {
  //     req.params = { id: carMockForUpdateWithId.id };
  //     await carController.delete(req, res);

  //     const statusStub = res.status as sinon.SinonStub
  //     const jsonStub = res.json as sinon.SinonStub

  //     expect(statusStub.calledWith(204)).to.be.true;
  //     expect(jsonStub.calledWith(carMockForUpdateWithId)).to.be.true;
  //   });
  // })
});