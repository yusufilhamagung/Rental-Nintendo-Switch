import { ConsoleRepository } from '@domain/repositories/ConsoleRepository';
import { RentalRepository } from '@domain/repositories/RentalRepository';
import { AppError } from '@shared/errors/AppError';

export class ReturnRental {
  constructor(
    private consoles: ConsoleRepository,
    private rentals: RentalRepository
  ) {}

  async execute(id: number) {
    if (!id) throw new AppError('id is required', 422);
    const rental = await this.rentals.findById(id);
    if (!rental) throw new AppError('Rental not found', 404);
    if (rental.status !== 'active')
      throw new AppError('Rental is not active', 409);

    const endDate = new Date();
    await this.rentals.markReturned(id, endDate);
    await this.consoles.setStatus(rental.consoleId, 'available');
    return { id, endDate };
  }
}
