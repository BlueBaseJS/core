export interface TypeText {
	primary: string;
	secondary: string;
	disabled: string;
	hint: string;
}

export interface PaletteColor {
	light: string;
	main: string;
	dark: string;
	contrastText: string;
}

export interface TypeAction {
	active: string;
	hover: string;
	hoverOpacity: number;
	selected: string;
	disabled: string;
	disabledBackground: string;
}

export interface TypeBackground {
	default: string;
	card: string;
}

export type TypeDivider = string;

export interface Palette {
	primary: PaletteColor;
	secondary: PaletteColor;
	error: PaletteColor;
	action: TypeAction;
	divider: TypeDivider;
	text: TypeText;
	background: TypeBackground;
}