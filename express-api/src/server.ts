import { createApp } from './app';
import { env } from '@config/env';
import { getPool } from '@infrastructure/db/mysql';
import net from 'node:net';

async function findAvailablePort(startPort: number, attempts = 20): Promise<number> {
  const check = (port: number) =>
    new Promise<boolean>((resolve) => {
      const srv = net
        .createServer()
        .once('error', () => resolve(false))
        .once('listening', () => srv.once('close', () => resolve(true)).close())
        .listen(port);
    });

  let port = startPort;
  for (let i = 0; i < attempts; i++) {
    // eslint-disable-next-line no-await-in-loop
    if (await check(port)) return port;
    port += 1;
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function start() {
  // Start server without forcing a DB connection at boot.
  // DB connections will be established on demand per request.
  const app = createApp();
  const port = await findAvailablePort(env.port);
  if (port !== env.port) {
    console.warn(`Port ${env.port} in use. Falling back to ${port}.`);
  }
  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
  });
  // Optionally warm up pool in background (non-blocking)
  if (env.warmupDbOnStart) {
    getPool()
      .getConnection()
      .then((conn) => conn.release())
      .catch((err) => {
        console.warn('DB not reachable at startup (non-fatal in dev):', err?.message || err);
      });
  }
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
