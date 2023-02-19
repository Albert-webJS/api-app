import { NextFunction, Request, Response } from 'express';
import { IMiddleWares } from './middleware.interface';

export class AuthGuard implements IMiddleWares {
	executer(request: Request, response: Response, next: NextFunction): void {
		if (request.body) return next();
		else {
			response.status(401).send({ error: 'user is not authorized' });
		}
	}
}
