import 'reflect-metadata';
import { BaseController, ValidateMiddlewares } from '../common';
import { NextFunction, Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from './dto';
import { inject, injectable } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger';
import { IUserController } from './users.interfaces';
import { TYPES } from '../types';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middleWares: [new ValidateMiddlewares(UserRegisterDto)],
			},
		]);
	}

	login(request: Request<{}, {}, UserLoginDto>, response: Response, next: NextFunction): void {
		next(new HttpError(401, 'auth login', 'login'));
	}

	register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction,
	): void {
		const result = this.userService.createdUser(body);
		if (!result) {
			return next(new HttpError(422, 'This user is already registered'));
		}
		this.ok(response, result);
	}
}
