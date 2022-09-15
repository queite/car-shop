import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  constructor(private model: IModel<IMotorcycle>) { }

  async create(obj: IMotorcycle): Promise<IMotorcycle> {
    MotorcycleZodSchema.parse(obj);
    return this.model.create(obj);
  }

  async read(): Promise<IMotorcycle[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this.model.readOne(id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  async update(id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    MotorcycleZodSchema.parse(obj);
    const updatedMotorcycle = await this.model.update(id, obj);
    if (!updatedMotorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return updatedMotorcycle;
  }

  async delete(id: string): Promise<IMotorcycle | null> {
    const deletedMotorcycle = await this.model.delete(id);
    if (!deletedMotorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return deletedMotorcycle;
  }
}
