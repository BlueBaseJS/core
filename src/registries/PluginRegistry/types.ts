import { Plugin } from '../../models/Plugin';

export interface PluginInput extends Partial<Plugin> {
	name: string;
	enabled?: boolean;
}
