import { App } from "./app";
import { LoggerService } from "./logger";

const bootstrapApplication = async (): Promise<void> => {
  const app = new App(new LoggerService());
  await app.init();
};


bootstrapApplication();