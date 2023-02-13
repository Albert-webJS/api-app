import { UserLoginDto, UserRegisterDto } from './dto';
import { User } from './user.entity';

export interface IUserService {
	createdUser(dto: UserRegisterDto): Promise<User | null>;
	userExistence(dto: UserLoginDto): Promise<boolean>;
}
