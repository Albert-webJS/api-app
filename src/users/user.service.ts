import 'reflect-metadata';
import { UserLoginDto, UserRegisterDto } from './dto';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config';
import { IUsersRepository } from './users.repository';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

export interface IUserService {
	createdUser(dto: UserRegisterDto): Promise<UserModel | null>;
	userExistence(dto: UserLoginDto): Promise<boolean>;
	getUserInfo(email: string): Promise<UserModel | null>;
}

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createdUser(dto: UserRegisterDto): Promise<UserModel | null> {
		if (!dto) return null;

		const { name, email, password } = dto;
		const newUser = new User(name, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async userExistence({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
