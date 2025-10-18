import { apiClient } from '../http/apiClient'
import { ConsoleRepository } from '@domain/repositories/ConsoleRepository'
import { GameConsole } from '@domain/entities/Console'

export class HttpConsoleRepository implements ConsoleRepository {
  async listAvailable(): Promise<GameConsole[]> {
    const res = await apiClient.get<{ status: boolean; data: GameConsole[] }>(`/consoles/available`)
    return res.data
  }
}

