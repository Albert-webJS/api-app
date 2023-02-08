import { App } from "./app";

const bootstrapApplication = async (): Promise<void> => {
  const app = new App();
  await app.init();
};


bootstrapApplication();