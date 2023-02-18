import 'reflect-metadata';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config';
import { IExeptionFilter } from './errors';
import { ILogger } from './logger';
import { PrismaService } from './database';
import { Server } from 'http';
import { TYPES } from './types';
import { UserController } from './users';
import { json } from 'body-parser';

@injectable()
export class App {
	app: Express;
	server: Server | undefined;
	port: number;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useMiddleware(): void {
		this.app.use(json());
	}

	private useRouter(): void {
		this.app.use('/users', this.userController.router);
	}

	private useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRouter();
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started in http://localhost:${this.port}`);
	}
}
