import { PluginInput } from './types';

/**
 * A type guard to check if an input objecct is a PluginInput
 * @param input Input Object
 */
export function isPluginInput(input: any): input is PluginInput {
	return (typeof input === 'object' && input.name !== undefined);
}
