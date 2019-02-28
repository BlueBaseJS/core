import { ComponentStyles, ThemeValue } from '../structure/Theme';
import { MaybeThunk, resolveThunk } from '../../utils';
import React from 'react';
import { ThemeContext } from '..';
import { buildTheme } from './buildTheme';
import deepmerge from 'deepmerge';
import isNil from 'lodash.isnil';

export type ComponentWithDefaultStyles = React.ComponentType<any> & { defaultStyles?: ComponentStyles };

export interface ThemedComponentProps {
	styles: ComponentStyles,

	[key: string]: any,
}

/**
 * Merges component styles from different sources and passes on the the component as 'styles' prop.
 *
 * Following sources are considered as style sources. (In order of least important first):
 *
 * 1. defaultStyles: A component may provide default styles as a "defaultStyles" static
 * property of component. This is similar to defaultProps in react.
 * 2. stylesParam: 3rd property of this function. Note: Component Registry passes 'styles' prop from it's registry item.
 * 3. Themes: From theme.components[componentName] property of current theme.
 * 4. styles prop: The styles prop passed on to the component during usage.
 *
 * FIXME: Fix return typing of this function
 *
 * @param name
 * @param Component
 * @param stylesParam
 */
export const applyStyles = (
	{ name, styles: stylesParam }: {
		name?: string,
		styles?: MaybeThunk<ComponentStyles>
	} = {}
) => (Component: ComponentWithDefaultStyles)
: React.ComponentType<any> =>
{

	return class ThemedComponent extends React.Component<ThemedComponentProps> {

		static contextType = ThemeContext;

		render() {

			const context: { theme: ThemeValue } = this.context;
			const { styles: stylesProp, ...rest } = this.props;

			// Extract defaultStyles from component
			const defaultStyles = Component.defaultStyles;

			// Extract theme, or use default theme as placeholder
			// We need to do this, because when the actual theme is being resolved,
			// we may need to show Loading state. That state may need some styles as well.
			const theme = context ? context.theme : buildTheme()();

			// Extract component style rules from theme
			let themedStyles;
			if (name) {
				const themeComponentStyles = theme.components;

				// Extract style rules for this component
				themedStyles = themeComponentStyles[name];
			}

			// Put all style rules in an array
			const stylesArr: any[] = [
				defaultStyles,
				stylesParam,
				themedStyles,
				stylesProp,
			]
			// Remove those styles which are nil
			.filter(a => !isNil(a))
			// If any item is a thunk, resolve it
			.map(a => a && resolveThunk(a, theme));

			// Merge all into a single object
			const styles = deepmerge.all(stylesArr);

			// If we were able to extract any rules, pass them forward in the styles prop
			const props = stylesArr.length > 0 ? { ...rest, styles } : rest;

			return React.createElement(Component, props);
		}
	};
};