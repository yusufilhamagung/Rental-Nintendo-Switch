import { Request, Response } from 'express';
import { GetAvailableConsoles } from '@application/use-cases/GetAvailableConsoles';

export class ConsoleController {
  constructor(private getAvailableConsoles: GetAvailableConsoles) {}

  available = async (_req: Request, res: Response) => {
    const data = await this.getAvailableConsoles.execute();
    return res.status(200).json({ status: true, message: 'Available Consoles', data });
  };
}
