import express from 'express';
import router from '@interfaces/http/routes';
import { errorHandler } from '@interfaces/http/middlewares/errorHandler';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/api', router);

  app.use(errorHandler);
  return app;
}
