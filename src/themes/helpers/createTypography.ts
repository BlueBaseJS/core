// tslint:disable:object-literal-sort-keys
import { Palette } from '../structure';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const FontWeight = {
	light: '300',
	regular: '400',
	medium: '500',
};

const caseAllCaps = {
	textTransform: 'uppercase',
};

const fontFamily = isWeb ? '"Roboto", "Helvetica", "Arial", sans-serif' : 'Roboto';

export function createTypography(palette: Palette) {
	const buildVariant = (
		fontWeight: string,
		size: number,
		_lineHeight: number,
		_letterSpacing: number,
		casing: any = {}
	) => ({
		color: palette.text.primary,
		fontFamily,
		fontWeight,
		fontSize: size,

		// TODO: unitless is causing issues on react-native-web
		// Unitless following http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
		// lineHeight,

		// TODO: Figure out letter spacing
		// // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
		// // across font-families can cause issues with the kerning.
		// ...(fontFamily === defaultFontFamily
		//   ? { letterSpacing: `${round(letterSpacing / size)}em` }
		//   : {}),

		...casing,
	});

	return {
		h1: buildVariant(FontWeight.light, 96, 1, -1.5),
		h2: buildVariant(FontWeight.light, 60, 1, -0.5),
		h3: buildVariant(FontWeight.regular, 48, 1.04, 0),
		h4: buildVariant(FontWeight.regular, 34, 1.17, 0.25),
		h5: buildVariant(FontWeight.regular, 24, 1.33, 0),
		h6: buildVariant(FontWeight.medium, 20, 1.6, 0.15),
		subtitle1: buildVariant(FontWeight.regular, 16, 1.75, 0.15),
		subtitle2: buildVariant(FontWeight.medium, 14, 1.57, 0.1),
		body1: buildVariant(FontWeight.regular, 16, 1.5, 0.15),
		body2: buildVariant(FontWeight.regular, 14, 1.5, 0.15),
		button: buildVariant(FontWeight.medium, 14, 1.5, 0.4, caseAllCaps),
		caption: buildVariant(FontWeight.regular, 12, 1.66, 0.4),
		overline: buildVariant(FontWeight.regular, 12, 2.66, 1, caseAllCaps),
	};
}
