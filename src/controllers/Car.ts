import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(protected _service: IService<ICar>) { }

  async create(req: Request, res: Response) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  async read(req: Request, res: Response) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const results = await this._service.readOne(id);
    return res.status(200).json(results);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const results = await this._service.update(id, req.body);
    return res.status(200).json(results);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}