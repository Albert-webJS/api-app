import express, { Express } from "express"
import { Server } from 'http'
import { userRouter } from "./users/user";

export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    constructor() {
        this.app = express();
        this.port = 8000;
    }

    private useRouter(): void {
        this.app.use("/users", userRouter)
    }

    public async init() {
        this.useRouter();
        this.server = this.app.listen(this.port);
        console.log(`Server started in http://localhost:${this.port}`);
    }
}