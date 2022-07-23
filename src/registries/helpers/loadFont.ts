import * as Font from 'expo-font';

import { FontValue } from '../FontRegistry';

export const loadAllFonts = async (fonts: { [name: string]: FontValue }) => {
	Font.loadAsync(fonts);
};
