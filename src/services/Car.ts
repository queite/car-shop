import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  // private _carModel: IModel<ICar>;

  constructor(private model: IModel<ICar>) {
    // this._carModel = model;
  }

  async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this.model.create(obj);
  }

  async read(): Promise<ICar[]> {
    return this.model.read();
  }
}
