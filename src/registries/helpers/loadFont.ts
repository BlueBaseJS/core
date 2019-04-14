import { FontValue } from '../FontRegistry';

declare const document: any;

export const loadFont = (fontName: string, font: string) => {
	const iconFontStyles = `@font-face {
		src: url(${font});
		font-family: ${fontName};
	}`;

  // Create stylesheet
	const style: any = document.createElement('style');
	style.type = 'text/css';

	if (style.styleSheet) {
		style.styleSheet.cssText = iconFontStyles;
	} else {
		style.appendChild(document.createTextNode(iconFontStyles));
	}

  // Inject stylesheet
	document.head.appendChild(style);
};

export const loadAllFonts = async (fonts: { [name: string]: FontValue }) => {
	Object.keys(fonts).forEach(fontName => {
		loadFont(fontName, fonts[fontName] as string);
	});
};