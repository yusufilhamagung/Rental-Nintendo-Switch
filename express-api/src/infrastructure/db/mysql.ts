import { createPool, Pool } from 'mysql2/promise';
import { env } from '@config/env';

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    pool = createPool({
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.password,
      database: env.db.database,
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }
  return pool;
};
