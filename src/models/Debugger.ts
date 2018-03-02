import { BlueRain } from '../index';

/**
 * Base class of a debugger which is to be extended.
 * @property {String}	debuggerName	Name of the debugger
 * @property {String}	slug	Debugger's slug, used in to build URL
 * @property {object}	config	debugger configurations
 * @property {String}	category	Category the Debugger belongs to
 * @property {String}	description	Debugger description
 * @property {String}	version	Debugger version
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
