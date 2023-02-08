import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common";
import { LoggerService } from "../logger";

export class UserController extends BaseController {
    constructor(
        logger: LoggerService
    ) {
        super(logger);
        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register }
        ])
    }

    login(request: Request, response: Response, next: NextFunction): void {
        this.ok(response, 'login');
    }

    register(request: Request, response: Response, next: NextFunction): void {
        this.ok(response, 'register');
    }
}