import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger";
import { TYPES } from "../types";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HttpError } from "./http-error.class";
import "reflect-metadata"

@injectable()
export class ExeptionFilter implements IExeptionFilter {
    constructor(@inject(TYPES.ILogger) private logger: ILogger) { }
    catch(error: Error | HttpError, request: Request, response: Response, next: NextFunction) {
        if (error instanceof HttpError) {
            this.logger.error(`[${error.context}] Error ${error.statusCode}: ${error.message}`);
            response.status(error.statusCode).send({ error: error.message });
        } else {
            this.logger.error(`${error.message}`);
            response.status(500).send({ error: error.message });
        }
    }
}