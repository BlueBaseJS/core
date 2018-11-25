import { BlueBase } from '../BlueBase';

/**
 * 📔 Logger API
 */
export class Logger {

	constructor(private BB: BlueBase) {
		//
	}

	public log(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.log', message, meta);
	}

	public info(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.info', message, meta);
	}

	public warn(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.warn', message, meta);
	}

	public error(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.error', message, meta);
	}

	public debug(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.debug', message, meta);
	}
}