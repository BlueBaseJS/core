import { BlueRain } from '../index';

/**
 * Base class of a logger which is to be extended.
 * @property {String}	loggerName	Name of the logger
 * @property {String}	slug	App's slug, used in to build URL
 * @property {object}	config	logger configurations
 * @property {String}	category	Category the App belongs to
 * @property {String}	description	Logger description
 * @property {String}	version	Logger version
 */
export class Debugger {
	debuggerName: string;
	slug?: string;
	config?: {};
	category?: string;
	description?: string;
	version?: string;

	constructor(debuggerName: string) {
		this.debuggerName = debuggerName;
	}

	log?(message: string, ...supportingData: any[]): void;
	warn?(message: string, ...supportingData: any[]): void;
	error?(message: string, ...supportingData: any[]): void;
	info?(message: string, ...supportingData: any[]): void;
	initialize?(config: {}, ctx: BlueRain): void;
}
