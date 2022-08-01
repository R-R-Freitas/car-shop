import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ) {
    const { body: motorcycle } = req;
    const results = await this._service.create(motorcycle);
    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const results = await this._service.readOne(id);
    return res.status(200).json(results);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const results = await this._service.update(id, req.body);
    res.status(200).json(results);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this._service.delete(id);
    res.status(204).json();
  }
}