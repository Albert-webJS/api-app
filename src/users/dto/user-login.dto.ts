import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'the email is incorrect' })
	email: string;

	@IsString()
	password: string;
}
