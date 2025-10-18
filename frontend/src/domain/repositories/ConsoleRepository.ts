import { GameConsole } from '../entities/Console'

export interface ConsoleRepository {
  listAvailable(): Promise<GameConsole[]>
}

