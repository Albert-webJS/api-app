import { NextFunction, Response, Request } from 'express';

export interface IExeptionFilter {
	catch: (error: Error, request: Request, response: Response, next: NextFunction) => void;
}
