import { ConsoleRepository } from '@domain/repositories/ConsoleRepository';
import { GameConsole } from '@domain/entities/Console';

export class GetAvailableConsoles {
  constructor(private consoles: ConsoleRepository) {}

  async execute(): Promise<GameConsole[]> {
    return this.consoles.listAvailable();
  }
}
