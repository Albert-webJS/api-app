import { ClassConstructor, plainToClass } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { IMiddleWares } from './middlewares.interface';
import { validate } from 'class-validator';

export class ValidateMiddlewares implements IMiddleWares {
	constructor(private classToValidate: ClassConstructor<object>) {}
	executer({ body }: Request, response: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) response.status(422).send(errors);
			else {
				next();
			}
		});
	}
}
