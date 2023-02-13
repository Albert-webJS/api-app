import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from './dto';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger';
import { IUserController } from './users.interfaces';
import { TYPES } from '../types';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(request: Request<{}, {}, UserLoginDto>, response: Response, next: NextFunction): void {
		next(new HttpError(401, 'auth login', 'login'));
	}

	register(
		request: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction,
	): void {
		this.ok(response, 'register');
	}
}
