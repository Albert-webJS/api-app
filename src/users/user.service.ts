import 'reflect-metadata';
import { UserLoginDto, UserRegisterDto } from './dto';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config';
import { IUserService } from './users.servicei.interface';
import { TYPES } from '../types';
import { User } from './user.entity';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async createdUser(dto: UserRegisterDto): Promise<User | null> {
		if (!dto) return null;

		const { name, email, password } = dto;
		const newUser = new User(name, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return newUser;
	}

	async userExistence(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
