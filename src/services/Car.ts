import { ErrorTypes } from '../errors/catalog';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  constructor(private model: IModel<ICar>) { }

  async create(obj: ICar): Promise<ICar> {
    CarZodSchema.parse(obj); // parse tbm gera erro quando o obj é inexistente / safeParse não gera erro, mas retorna um objeto contendo os dados ou uma instancia de ZodError
    return this.model.create(obj);
  }

  async read(): Promise<ICar[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<ICar | null> {
    const car = await this.model.readOne(id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  async update(id: string, obj: ICar): Promise<ICar | null> {
    CarZodSchema.parse(obj);
    const updatedCar = await this.model.update(id, obj);
    if (!updatedCar) throw new Error(ErrorTypes.EntityNotFound);
    return updatedCar;
  }

  async delete(id: string): Promise<ICar | null> {
    const deletedCar = await this.model.delete(id);
    if (!deletedCar) throw new Error(ErrorTypes.EntityNotFound);
    return deletedCar;
  }
}
