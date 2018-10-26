import { BlueBase } from '../BlueBase';

export class Logger {

	constructor(private BB: BlueBase) {
		//
	}

	public log(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.log', message, meta).then();
	}

	public info(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.info', message, meta).then();
	}

	public warn(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.warn', message, meta).then();
	}

	public error(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.error', message, meta).then();
	}

	public debug(message: string, meta: any) {
		this.BB.Hooks.run('bluebase.logger.debug', message, meta).then();
	}
}