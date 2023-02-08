import { Request, Response, NextFunction, Router } from "express";


export interface RouteController {
    path: string;
    func: (request: Request, response: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}