import express, { Express } from "express"
import { Server } from 'http'
import { LoggerService } from "./logger";
import { UserController } from "./users";

export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    _userController: UserController
    constructor(
        private logger: LoggerService,
        private userController: UserController
    ) {
        this.app = express();
        this.port = 8000;
        this._userController = userController
    }

    private useRouter(): void {
        this.app.use("/users", this._userController.router)
    }

    public async init() {
        this.useRouter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started in http://localhost:${this.port}`);
    }
}