import { BlueBase } from '../BlueBase';

export class Logger {

	constructor(private BB: BlueBase) {
		//
	}

	public log(message?: any, ...optionalParams: any[]) {
		this.BB.Hooks.run('bluebase.logger.log', message, optionalParams).then();
	}

	public info(message?: any, ...optionalParams: any[]) {
		this.BB.Hooks.run('bluebase.logger.info', message, optionalParams).then();
	}

	public warn(message?: any, ...optionalParams: any[]) {
		this.BB.Hooks.run('bluebase.logger.warn', message, optionalParams).then();
	}

	public error(message?: any, ...optionalParams: any[]) {
		this.BB.Hooks.run('bluebase.logger.error', message, optionalParams).then();
	}

	public debug(message?: any, ...optionalParams: any[]) {
		this.BB.Hooks.run('bluebase.logger.debug', message, optionalParams).then();
	}
}
