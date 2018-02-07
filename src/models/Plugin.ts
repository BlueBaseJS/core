import { BlueRainType } from '../index';
import { hookFn } from '../registries/HooksRegistry';
import React from 'react';

/**
 * Base class of a plugin which is to be extended.
 * @property {String}	pluginName	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {object}	config	Plugin configurations
 * @property {String}	category	Category the App belongs to
 * @property {String}	description	App description
 * @property {String}	version	App version
 */
export class Plugin {
	pluginName: string;
	slug?: string;
	config?: {};
	category?: string;
	description?: string;
	version?: string;

	hooks?: { [id: string]: hookFn };
	components?: { [id: string]: React.ComponentType<any> };

	initialize?(config: {}, ctx: BlueRainType): void;
}
