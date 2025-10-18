import { ConsoleRepository } from '@domain/repositories/ConsoleRepository';
import { RentalRepository } from '@domain/repositories/RentalRepository';
import { AppError } from '@shared/errors/AppError';

export interface CreateRentalInput {
  consoleId: number;
  customerName: string;
  days: number;
}

export class CreateRental {
  constructor(
    private consoles: ConsoleRepository,
    private rentals: RentalRepository
  ) {}

  async execute(input: CreateRentalInput) {
    if (!input.consoleId || !input.customerName || !input.days) {
      throw new AppError('consoleId, customerName, days are required', 422);
    }
    if (input.days <= 0) throw new AppError('days must be > 0', 422);

    const console = await this.consoles.findById(input.consoleId);
    if (!console) throw new AppError('Console not found', 404);
    if (console.status !== 'available')
      throw new AppError('Console not available', 409);

    const start = new Date();
    const end = new Date(start.getTime());
    end.setDate(start.getDate() + input.days);
    const totalPrice = console.dailyPrice * input.days;

    const rental = await this.rentals.create({
      consoleId: console.id,
      customerName: input.customerName,
      startDate: start,
      endDate: end,
      status: 'active',
      totalPrice,
    });

    await this.consoles.setStatus(console.id, 'rented');
    return rental;
  }
}
