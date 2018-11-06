import { ThemeInput } from '../../models';

/**
 * A type guard to check if an input objecct is a ThemeInput
 * @param input Input Object
 */
export function isThemeInput(input: any): input is ThemeInput {
	return (typeof input === 'object' && input.name !== undefined);
}
