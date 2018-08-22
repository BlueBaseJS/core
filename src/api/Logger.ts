import { BlueRain } from '../BlueRain';

export class Logger {

	constructor(private BR: BlueRain) { }

	public log(message: string, meta: any) {
		this.BR.Hooks.run('bluerain.logger.log', message, meta).then();
	}

	public info(message: string, meta: any) {
		this.BR.Hooks.run('bluerain.logger.info', message, meta).then();
	}

	public warn(message: string, meta: any) {
		this.BR.Hooks.run('bluerain.logger.warn', message, meta).then();
	}

	public error(message: string, meta: any) {
		this.BR.Hooks.run('bluerain.logger.error', message, meta).then();
	}

	public debug(message: string, meta: any) {
		this.BR.Hooks.run('bluerain.logger.debug', message, meta).then();
	}
}