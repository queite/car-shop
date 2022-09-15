import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carCreateMock, carForUpdateMock, carForUpdateWithIdMock, carWithIdMock } from '../../mocks/carsMock';
import CarModel from '../../../models/Car';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Model Cars', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carWithIdMock);
    sinon.stub(Model, 'find').resolves([carWithIdMock]);
    sinon.stub(Model, 'findOne').resolves(carWithIdMock);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carForUpdateWithIdMock);
    sinon.stub(Model, 'findOneAndRemove').resolves(carWithIdMock);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car', () => {
    it('successfully', async () => {
      const newCar = await carModel.create(carCreateMock);
      expect(newCar).to.be.deep.eq(carWithIdMock);
    });
  })

  describe('Get cars', () => {
    it('should get all cars successfully', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.eq([carWithIdMock]);
    });

    it('should get cars by ID successfully', async () => {
      const car = await carModel.readOne(carWithIdMock.id);
      expect(car).to.be.deep.eq(carWithIdMock);
    });

    it('should to throw the error "InvalidMongoId" when the ID is wrong', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
  })

  describe('Update car', () => {
    it('successfully', async () => {
			const car = await carModel.update(carForUpdateWithIdMock.id, carForUpdateMock);
			expect(car).to.be.deep.equal(carForUpdateWithIdMock);
		});

		it('should to throw the error "InvalidMongoId" when the ID is wrong', async () => {
			try {
				await carModel.update('123ERRADO', carForUpdateMock);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
  })

  describe('Delete car by ID', () => {
    it('should delete a car successfully', async () => {
      const deletedCar = await carModel.delete(carWithIdMock.id);
      expect(deletedCar).to.be.deep.eq(carWithIdMock);
    });

    it('should to throw the error "InvalidMongoId" when the ID is wrong', async () => {
			try {
				await carModel.delete('123ERRADO');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
  })

});