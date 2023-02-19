import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleWares } from './validate.middleware';

export interface RouteController {
	path: string;
	func: (request: Request, response: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middleWares?: IMiddleWares[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
