import { JwtPayload, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { IMiddleWares } from './middleware.interface';

export class AuthMiddleware implements IMiddleWares {
	constructor(private secret: string) {}
	executer(request: Request, response: Response, next: NextFunction): void {
		if (request.headers.authorization) {
			verify(request.headers.authorization.split(' ')[1], this.secret, (_, payload) => {
				try {
					request.user = (payload as JwtPayload).email;
					next();
				} catch (error) {
					next();
				}
			});
		} else {
			next();
		}
	}
}
