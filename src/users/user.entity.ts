import { hash } from 'bcryptjs';

export class User {
	private _password: string | undefined;
	constructor(private readonly _name: string, private readonly _email: string) {}

	get name(): string {
		return this.name;
	}

	get email(): string {
		return this.email;
	}

	get password(): string | undefined {
		if (!this._password) return undefined;
		else {
			return this._password;
		}
	}

	public async setPassword(pass: string): Promise<void> {
		this._password = await hash(pass, 10);
	}
}
