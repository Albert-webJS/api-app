import { App } from "./app";
import { LoggerService } from "./logger";
import { UserController } from "./users";

const bootstrapApplication = async (): Promise<void> => {
  const logger = new LoggerService()
  const app = new App(logger, new UserController(logger));
  await app.init();
};


bootstrapApplication();