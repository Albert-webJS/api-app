import 'reflect-metadata';
import { BaseController, ValidateMiddlewares } from '../common';
import { NextFunction, Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from './dto';
import { inject, injectable } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger';
import { TYPES } from '../types';
import { UserService } from './user.service';

export interface IUserController {
	login(request: Request, response: Response, next: NextFunction): void;
	register(request: Request, response: Response, next: NextFunction): void;
}

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middleWares: [new ValidateMiddlewares(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middleWares: [new ValidateMiddlewares(UserRegisterDto)],
			},
		]);
	}

	async login(
		request: Request<{}, {}, UserLoginDto>,
		response: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.userExistence(request.body);
		if (!result) {
			return next(new HttpError(401, 'login error', 'login'));
		}
		this.ok(response, {});
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
