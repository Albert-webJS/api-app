import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HttpError } from "./http-error.class";

export class ExeptionFilter implements IExeptionFilter {
    logger: LoggerService
    constructor(
        logger: LoggerService
    ) {
        this.logger = logger

    }
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