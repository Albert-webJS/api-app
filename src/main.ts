import 'reflect-metadata';
import { ConfigService, IConfigService } from './config';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ExeptionFilter, IExeptionFilter } from './errors';
import { ILogger, LoggerService } from './logger';
import { IUserController, IUserService, UserController, UserService } from './users';
import { App } from './app';

import { TYPES } from './types';

interface BootstrapApplication {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
});

const bootstrapApplication = (): BootstrapApplication => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
};

export const { appContainer, app } = bootstrapApplication();
