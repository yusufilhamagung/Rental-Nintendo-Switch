import { GameConsole } from '@domain/entities/Console';

export interface ConsoleRepository {
  listAvailable(): Promise<GameConsole[]>;
  findById(id: number): Promise<GameConsole | null>;
  setStatus(id: number, status: GameConsole['status']): Promise<void>;
}
