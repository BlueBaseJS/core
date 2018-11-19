import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ComponentStyles } from './Theme';
import React from 'react';
import deepmerge from 'deepmerge';
import isNil from 'lodash.isnil';

export type ComponentWithDefaultStyles = React.ComponentType<any> & { defaultStyles?: ComponentStyles };

export interface ThemedComponentProps {
	styles: ComponentStyles,

	[key: string]: any,
}

export interface ThemedComponentState {
	readonly themedStyles?: ComponentStyles,
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
 * FIXME: This doesn't handle loading state yet. i.e. When async theme is laoding
 * FIXME: Fix return typing of this function
 *
 * @param name
 * @param Component
 * @param stylesParam
 */
export const applyStyles = (name: string, Component: ComponentWithDefaultStyles, stylesParam: ComponentStyles = {})
: React.ComponentType<any> =>
{

	return class ThemedComponent extends React.PureComponent<ThemedComponentProps, ThemedComponentState> {

		static contextType = BlueBaseContext;

		readonly state: ThemedComponentState = {
			themedStyles: undefined,
		};

		async componentWillMount() {
			const BB: BlueBase = (this as any).context;

			const theme = await BB.Themes.resolve(BB.Configs.getValue('theme.name'));
			const themedStyles = (theme.components[name]) ? theme.components[name] : {};

			this.setState({ themedStyles });
		}

		render() {
			const { styles: stylesProp, ...rest } = this.props;
			const { themedStyles = {} } = this.state;

			const defaultStyles = Component.defaultStyles || {};

			const styles = deepmerge.all([
				defaultStyles,
				stylesParam,
				themedStyles,
				stylesProp,
			].filter(a => !isNil(a)));

			return React.createElement(Component, { ...rest, styles });
		}
	};
};