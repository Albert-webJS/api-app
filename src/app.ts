import express, { Express } from "express"
import { Server } from 'http'
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger";
import { UserController } from "./users";

export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    logger: LoggerService
    userController: UserController
    exeptionFilter: ExeptionFilter;
    constructor(
        logger: LoggerService,
        userController: UserController,
        exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger
        this.userController = userController;
        this.exeptionFilter = exeptionFilter
    }

    private useRouter(): void {
        this.app.use("/users", this.userController.router)
    }

    private useExeptionFilter(): void {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init() {
        this.useRouter();
        this.useExeptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started in http://localhost:${this.port}`);
    }
}