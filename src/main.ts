import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger";
import { UserController } from "./users";

const bootstrapApplication = async (): Promise<void> => {
  const logger = new LoggerService()
  const app = new App(
    logger,
    new UserController(logger),
    new ExeptionFilter(logger)
  );
  await app.init();
};


bootstrapApplication();