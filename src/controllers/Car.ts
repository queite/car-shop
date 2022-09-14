import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(protected _service: IService<ICar>) { }

  async create(req: Request, res: Response) {
    console.log(req.body);
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }
}