import { ExpressReturnType, RouteController } from './route.interface';
import { Response, Router } from 'express';
import { ILogger } from '../logger';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(response: Response, code: number, message: T): ExpressReturnType {
		response.type('application/json');
		return response.status(code).json(message);
	}

	public ok<T>(response: Response, messaage: T): ExpressReturnType {
		return this.send(response, 200, messaage);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: RouteController[]): void {
		routes.forEach((route) => {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middlewares = route.middleWares?.map((m) => m.executer.bind(m));
			const handler = route.func.bind(this);
			const pipeLine = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeLine);
		});
	}
}
