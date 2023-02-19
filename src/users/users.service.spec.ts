import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config';
import { IUserService } from './user.service';
import { IUsersRepository } from './users.repository';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { UserService } from './user.service';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
	it('method created user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('one');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await usersService.createUser({
			name: 'Fox',
			email: 'fox@gmail.com',
			password: '#10fox',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('#10fox');
	});
});
