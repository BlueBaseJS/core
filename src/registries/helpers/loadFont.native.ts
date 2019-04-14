import { FontValue } from '../FontRegistry';

declare const global: any;

export const loadAllFonts = async (fonts: { [name: string]: FontValue }) => {
	if (global.__expo && global.__expo.Font && global.__expo.Font.loadAsync) {
		await global.__expo.Font.loadAsync(fonts);
	}
};