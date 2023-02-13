import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { LoggerService, ILogger } from './logger';
import { TYPES } from './types';
import { UserController } from './users';
import 'reflect-metadata';

interface BootstrapApplication {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
});

const bootstrapApplication = (): BootstrapApplication => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
};

export const { appContainer, app } = bootstrapApplication();
