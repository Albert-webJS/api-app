import express, { Express } from "express"
import { Server } from 'http'
import { LoggerService } from "./logger";
import { userRouter } from "./users/user";

export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    constructor(private logger: LoggerService) {
        this.app = express();
        this.port = 8000;
    }

    private useRouter(): void {
        this.app.use("/users", userRouter)
    }

    public async init() {
        this.useRouter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started in http://localhost:${this.port}`);
    }
}