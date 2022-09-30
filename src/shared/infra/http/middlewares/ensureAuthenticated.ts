import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "d0f1d0f1d0f1d0f1d0f1d0f1d0f1d0f1") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: sub
    }

    return next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}

