import { inject, injectable } from 'inversify';
import { PrismaService } from '../database';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

export interface IUsersRepository {
	create(user: User): Promise<UserModel>;
	find(email: string): Promise<UserModel | null>;
}

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ name, email, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				email,
				password,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
