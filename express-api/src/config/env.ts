import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_express_api',
  },
  // Set DB_STARTUP_CHECK=true to attempt a warmup connection and log failures
  warmupDbOnStart: (process.env.DB_STARTUP_CHECK || 'false').toLowerCase() === 'true',
};
