import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger';
import { TYPES } from './types';
import { UserController } from './users';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server | undefined;
	port: number;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useRouter(): void {
		this.app.use('/users', this.userController.router);
	}

	private useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRouter();
		this.useExeptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started in http://localhost:${this.port}`);
	}
}
