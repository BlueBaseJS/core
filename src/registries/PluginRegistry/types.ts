import { Plugin } from '../../models/Plugin';

/**
 * A PluginInput object where all Plugin properties are optional.
 */
export interface PluginInput extends Partial<Plugin> {
	name: string;
	enabled?: boolean;
}
