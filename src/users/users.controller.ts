import 'reflect-metadata';
import { AuthGuard, BaseController, ValidateMiddlewares } from '../common';
import { NextFunction, Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from './dto';
import { inject, injectable } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { IConfigService } from '../config';
import { ILogger } from '../logger';
import { IUserService } from './user.service';
import { TYPES } from '../types';
import { sign } from 'jsonwebtoken';

export interface IUserController {
	login(request: Request, response: Response, next: NextFunction): void;
	register(request: Request, response: Response, next: NextFunction): void;
	info(request: Request, response: Response, next: NextFunction): void;
}

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
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
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middleWares: [new AuthGuard()],
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
		const jwt = await this.singJWT(request.body.email, this.configService.get('SECRET'));
		this.ok(response, { jwt });
	}

	register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction,
	): void {
		const result = this.userService.createUser(body);
		if (!result) {
			return next(new HttpError(422, 'This user is already registered'));
		}
		this.ok(response, result);
	}

	async info(
		{ user }: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction,
	): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(response, { email: userInfo?.email, id: userInfo?.id });
	}

	private singJWT(email: string, privateKey: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				privateKey,
				{ algorithm: 'HS256' },
				(error, token) => {
					if (!token) reject(error);
					else {
						resolve(token as string);
					}
				},
			);
		});
	}
}
