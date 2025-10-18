import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ status: false, message: err.message });
  }
  console.error(err);
  return res.status(500).json({ status: false, message: 'Internal Server Error' });
}
