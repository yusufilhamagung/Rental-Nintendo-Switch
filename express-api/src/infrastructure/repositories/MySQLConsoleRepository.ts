import { GameConsole } from '@domain/entities/Console';
import { ConsoleRepository } from '@domain/repositories/ConsoleRepository';
import { getPool } from '@infrastructure/db/mysql';

export class MySQLConsoleRepository implements ConsoleRepository {
  async listAvailable(): Promise<GameConsole[]> {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, model, `condition`, daily_price AS dailyPrice, status FROM consoles WHERE status = ? ORDER BY id DESC',
      ['available']
    );
    return rows as GameConsole[];
  }

  async findById(id: number): Promise<GameConsole | null> {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, model, `condition`, daily_price AS dailyPrice, status FROM consoles WHERE id = ? LIMIT 1',
      [id]
    );
    const list = rows as GameConsole[];
    return list.length ? list[0] : null;
  }

  async setStatus(id: number, status: GameConsole['status']): Promise<void> {
    const pool = getPool();
    await pool.query('UPDATE consoles SET status = ? WHERE id = ?', [status, id]);
  }
}
