import { ComponentStyles, ThemeValue } from './Theme';
import { MaybeThunk, resolveThunk } from '../../utils';
import React from 'react';
import { ThemeContext } from '../../themes';
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
	name: string,
	Component: ComponentWithDefaultStyles,
	stylesParam: MaybeThunk<ComponentStyles> = {})
: React.ComponentType<any> =>
{

	return class ThemedComponent extends React.PureComponent<ThemedComponentProps> {

		render() {

			const { styles: stylesProp, ...rest } = this.props;

			return (
				<ThemeContext.Consumer children={(args?: { theme: ThemeValue }) => {

					if(!args) {
						return;
					}

					const { theme } = args;

					const defaultStyles = Component.defaultStyles;
					const themedStyles = theme.components[name];

					const stylesArr: any = [
						defaultStyles,
						stylesParam,
						themedStyles,
						stylesProp,
					]
					.filter(a => !isNil(a))
					.map(a => a && resolveThunk(a, theme));

					const styles = deepmerge.all(stylesArr);

					return React.createElement(Component, { ...rest, styles });
				}} />
			);
		}
	};
};