import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './mongoModel';

const motorcycleMongoSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: {
    type: String,
    enum: ['Street', 'Custom', 'Trail'],
  },
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('MotorcycleModel', motorcycleMongoSchema)) {
    super(model);
  }
}

export default MotorcycleModel;