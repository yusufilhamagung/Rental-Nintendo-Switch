import { HttpConsoleRepository } from '@infrastructure/repositories/HttpConsoleRepository'
import { DummyConsoleRepository } from '@infrastructure/repositories/DummyConsoleRepository'
import { HttpRentalRepository } from '@infrastructure/repositories/HttpRentalRepository'
import { GetAvailableConsoles } from '@application/use-cases/GetAvailableConsoles'
import { CreateRental } from '@application/use-cases/CreateRental'
import { ReturnRental } from '@application/use-cases/ReturnRental'

// Simple service locator for the app
// Use dummy data for catalog during simulation
const consoleRepo = new DummyConsoleRepository()
const rentalRepo = new HttpRentalRepository()

export const useCases = {
  getAvailableConsoles: new GetAvailableConsoles(consoleRepo),
  createRental: new CreateRental(rentalRepo),
  returnRental: new ReturnRental(rentalRepo),
}
