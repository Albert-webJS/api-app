import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'the user name is not specified' })
	name: string;
	@IsEmail({}, { message: 'the email is incorrect' })
	email: string;
	@IsString({ message: 'password is not specified' })
	password: string;
}
