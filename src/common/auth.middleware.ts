import { NextFunction, Request, Response } from 'express';
import { IMiddleWares } from './validate.middleware';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleWares {
	constructor(private secret: string) {}
	executer(request: Request, response: Response, next: NextFunction): void {
		if (request.headers.authorization) {
			verify(request.headers.authorization.split(' ')[1], this.secret, (_, payload) => {
				try {
					if (typeof payload === 'object') {
						request.user = payload.email;
						next();
					}
				} catch (error) {
					next();
				}
			});
		}
	}
}
