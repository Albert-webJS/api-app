import 'reflect-metadata';
import { UserLoginDto, UserRegisterDto } from './dto';
import { IUserService } from './users.servicei.interface';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	async createdUser(dto: UserRegisterDto): Promise<User | null> {
		if (!dto) return null;

		const { name, email, password } = dto;
		const newUser = new User(name, email);
		await newUser.setPassword(password);
		return newUser;
	}

	async userExistence(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
