import { Response, Request, NextFunction } from "express";

export interface IUserController {
    login(request: Request, response: Response, next: NextFunction): void;
    register(request: Request, response: Response, next: NextFunction): void;
}