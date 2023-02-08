import { Router } from "express";
import { LoggerService } from "../logger";
import { RouteController } from "./route.interface";

export abstract class BaseController {
    private readonly _router: Router;
    constructor(private logger: LoggerService) {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }

    protected bindRoutes(routes: RouteController[]): void {
        routes.forEach(route => {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler)
        })
    }
}