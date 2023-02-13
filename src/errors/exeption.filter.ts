import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpError } from './http-error.class';
import { IExeptionFilter } from './exeption.filter.interface';
import { ILogger } from '../logger';
import { TYPES } from '../types';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	catch(error: Error | HttpError, request: Request, response: Response, next: NextFunction): void {
		if (error instanceof HttpError) {
			this.logger.error(`[${error.context}] Error ${error.statusCode}: ${error.message}`);
			response.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(`${error.message}`);
			response.status(500).send({ error: error.message });
		}
	}
}
