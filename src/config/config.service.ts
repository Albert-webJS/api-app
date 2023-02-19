import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger';
import { TYPES } from '../types';

export interface IConfigService {
	get(key: string): string;
}

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) this.logger.error('The file is not read, ".env" or is missing');
		else {
			this.logger.log('The configuration is loaded ');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
