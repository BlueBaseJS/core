import { BlueBase } from '../BlueBase';

/**
 * 📔 Logger API
 */
export class Logger {
	constructor(private BB: BlueBase) {
		//
	}

	public log(message?: any, ...params: any[]) {
		this.BB.Hooks.run('bluebase.logger.log', message, { params });
	}

	public info(message?: any, ...params: any[]) {
		this.BB.Hooks.run('bluebase.logger.info', message, { params });
	}

	public warn(message?: any, ...params: any[]) {
		this.BB.Hooks.run('bluebase.logger.warn', message, { params });
	}

	public error(message?: any, ...params: any[]) {
		this.BB.Hooks.run('bluebase.logger.error', message, { params });
	}

	public debug(message?: any, ...params: any[]) {
		this.BB.Hooks.run('bluebase.logger.debug', message, { params });
	}
}
