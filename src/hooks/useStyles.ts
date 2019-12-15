import { MaybeThunk, resolveThunk } from '../utils';

import { ComponentStyles } from '../themes';
import deepmerge from 'deepmerge';
import isNil from 'lodash.isnil';
import { useBlueBase } from './useBlueBase';
import { useTheme } from './useTheme';

export function useStyles<T = ComponentStyles>(
	componentName: string,
	props: { styles?: T } = {},
	defaultStyles?: T
): T {
	const BB = useBlueBase();
	const { theme } = useTheme();

	const { styles: stylesProp, ...rest } = props;

	// Find styles in the component registry
	const stylesParam = BB.Components.getStyles(componentName);

	// Extract component style rules from theme
	let themedStyles: MaybeThunk<ComponentStyles>;
	if (componentName) {
		const themeComponentStyles = theme.components;

		// Extract style rules for this component
		themedStyles = themeComponentStyles[componentName];
	}

	// Put all style rules in an array
	const stylesArr = [defaultStyles!, stylesParam!, themedStyles!, stylesProp!]
		// Remove those styles which are nil
		.filter(a => !isNil(a))
		// If any item is a thunk, resolve it
		.map((a: any) => a && resolveThunk(a, theme, rest)) as ComponentStyles[];

	// Merge all into a single object
	const styles = deepmerge.all(stylesArr) as any;

	return styles;
}
