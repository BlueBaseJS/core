import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ComponentStyles } from './Theme';
import React from 'react';
import deepmerge from 'deepmerge';

export type ComponentWithDefaultStyles = React.ComponentType<any> & { defaultStyles?: ComponentStyles };

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
 * @param name
 * @param Component
 * @param stylesParam
 */
export const applyStyles = (name: string, Component: ComponentWithDefaultStyles, stylesParam: ComponentStyles = {}) =>
{

	return class ThemedComponent extends React.PureComponent<any> {

		static contextType = BlueBaseContext;

		render() {
			const BB: BlueBase = (this as any).context;
			const { styles: stylesProp = {}, ...rest } = this.props;

			const defaultStyles = Component.defaultStyles || {};

			const theme = BB.Themes.get(BB.Configs.getValue('theme'));
			const themedStyles = (theme && theme.components && theme.components[name]) ? theme.components[name] : {};

			const styles = deepmerge.all([
				defaultStyles,
				stylesParam,
				themedStyles,
				stylesProp
			]);

			return React.createElement(Component, { ...rest, styles });
		}
	};
};