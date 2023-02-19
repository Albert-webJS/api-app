import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(
		private readonly _name: string,
		private readonly _email: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get name(): string {
		return this.name;
	}

	get email(): string {
		return this.email;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
