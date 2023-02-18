import { inject, injectable } from 'inversify';
import { ILogger } from '../logger';
import { PrismaClient } from '@prisma/client';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	private client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('Connect in database SUCCESS!');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`[PrismaService], Error connect in database ${error.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
