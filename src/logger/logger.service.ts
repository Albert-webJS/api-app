import { injectable } from 'inversify';
import { Logger, ISettingsParam, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: false,
			displayFunctionName: false,
		} as ISettingsParam<ILogObj>);
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
