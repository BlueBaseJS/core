import { PluginInput } from './types';

export function isPluginInput(input: any): input is PluginInput {
	return (typeof input === 'object' && input.name !== undefined);
}
