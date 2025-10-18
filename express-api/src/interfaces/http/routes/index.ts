import { Router, Request, Response } from 'express';
import { ConsoleController } from '@interfaces/http/controllers/ConsoleController';
import { RentalController } from '@interfaces/http/controllers/RentalController';
import { GetAvailableConsoles } from '@application/use-cases/GetAvailableConsoles';
import { CreateRental } from '@application/use-cases/CreateRental';
import { ReturnRental } from '@application/use-cases/ReturnRental';
import { MySQLConsoleRepository } from '@infrastructure/repositories/MySQLConsoleRepository';
import { MySQLRentalRepository } from '@infrastructure/repositories/MySQLRentalRepository';

const router = Router();

// Wiring dependencies (simple manual DI)
const consoleRepo = new MySQLConsoleRepository();
const rentalRepo = new MySQLRentalRepository();

const consoleController = new ConsoleController(new GetAvailableConsoles(consoleRepo));
const rentalController = new RentalController(
  new CreateRental(consoleRepo, rentalRepo),
  new ReturnRental(consoleRepo, rentalRepo)
);

// Health
router.get('/health', (_req: Request, res: Response) => res.json({ status: true, message: 'OK' }));

// Consoles
router.get('/consoles/available', consoleController.available);

// Rentals
router.post('/rentals', rentalController.create);
router.post('/rentals/:id/return', rentalController.return);

export default router;
