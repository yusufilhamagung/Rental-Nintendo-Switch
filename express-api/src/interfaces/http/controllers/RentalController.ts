import { Request, Response } from 'express';
import { CreateRental } from '@application/use-cases/CreateRental';
import { ReturnRental } from '@application/use-cases/ReturnRental';

export class RentalController {
  constructor(
    private createRental: CreateRental,
    private returnRental: ReturnRental
  ) {}

  create = async (req: Request, res: Response) => {
    const { consoleId, customerName, days } = req.body || {};
    const rental = await this.createRental.execute({
      consoleId: Number(consoleId),
      customerName: String(customerName || ''),
      days: Number(days),
    });
    return res.status(201).json({ status: true, message: 'Rental created', data: rental });
  };

  return = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await this.returnRental.execute(id);
    return res.status(200).json({ status: true, message: 'Rental returned', data });
  };
}
