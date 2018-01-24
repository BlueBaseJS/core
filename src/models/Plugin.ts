import React from 'react';
import { BlueRainType } from '../index';
import { ConfigType } from '../config';

/**
 * Base class of a plugin which is to be extended.
 * @property {String}	pluginName	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {object}	config	Plugin configurations
 * @property {String}	category	Category the App belongs to
 * @property {String}	description	App description
 * @property {String}	version	App version
 */
export default class Plugin {
	pluginName: string;
	slug: string;
	config?: {};
	category?: string;
	description?: string;
	version?: string;

	hooks?: { [id: string]: Function };
	components?: { [id: string]: React.ComponentType<any> };
	initialize?: (ctx: BlueRainType, config: ConfigType) => {};
}
