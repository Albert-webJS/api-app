import { NextFunction, Request, Response } from 'express';

export interface IMiddleWares {
	executer(request: Request, response: Response, next: NextFunction): void;
}
