import { Response, Router } from "express";
import { injectable } from "inversify";
import { ILogger } from "../logger";
import { RouteController } from "./route.interface";

@injectable()
export abstract class BaseController {
    private readonly _router: Router;
    constructor(private logger: ILogger) {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }

    public send<T>(response: Response, code: number, message: T) {
        response.type('application/json');
        return response.status(code).json(message)
    }

    public ok<T>(response: Response, messaage: T) {
        return this.send(response, 200, messaage)
    }

    public created(res: Response) {
        return res.sendStatus(201)
    }

    protected bindRoutes(routes: RouteController[]): void {
        routes.forEach(route => {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler)
        })
    }
}
