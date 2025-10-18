import { Rental } from '@domain/entities/Rental';
import { RentalRepository } from '@domain/repositories/RentalRepository';
import { getPool } from '@infrastructure/db/mysql';

export class MySQLRentalRepository implements RentalRepository {
  async create(data: Omit<Rental, 'id'>): Promise<Rental> {
    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO rentals (console_id, customer_name, start_date, end_date, status, total_price) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.consoleId,
        data.customerName,
        data.startDate,
        data.endDate,
        data.status,
        data.totalPrice,
      ]
    );
    const insertId = (result as any).insertId as number;
    return { id: insertId, ...data };
  }

  async findById(id: number): Promise<Rental | null> {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, console_id AS consoleId, customer_name AS customerName, start_date AS startDate, end_date AS endDate, status, total_price AS totalPrice FROM rentals WHERE id = ? LIMIT 1',
      [id]
    );
    const list = rows as Rental[];
    return list.length ? this.hydrate(list[0]) : null;
  }

  async markReturned(id: number, endDate: Date): Promise<void> {
    const pool = getPool();
    await pool.query('UPDATE rentals SET status = ?, end_date = ? WHERE id = ?', [
      'returned',
      endDate,
      id,
    ]);
  }

  private hydrate(row: Rental): Rental {
    return {
      ...row,
      startDate: new Date(row.startDate),
      endDate: new Date(row.endDate),
    };
  }
}
