import 'reflect-metadata';
import { ILogObj, ISettingsParam, Logger } from 'tslog';
import { injectable } from 'inversify';

export interface ILogger {
	logger: Logger<ILogObj>;
	log(...args: unknown[]): void;
	error(...args: unknown[]): void;
	warn(...args: unknown[]): void;
}

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
