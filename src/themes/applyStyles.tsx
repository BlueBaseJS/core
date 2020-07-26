import { ComponentStyles } from './Theme';
import { MaybeThunk } from '../utils';
import React from 'react';
import { useStyles } from '../hooks';

export type BlueBaseComponent<T = any> = React.ComponentType<T> & {
	defaultStyles?: ComponentStyles;
};

export type ComponentWithDefaultStyles = BlueBaseComponent;

export interface ThemedComponentProps {
	styles: ComponentStyles;

	[key: string]: any;
}

export type applyStylesOptions =
	| string
	| {
			name: string;

			/**
			 * @deprecated
			 */
			styles?: MaybeThunk<ComponentStyles>;
	  };

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
 * @param options
 */

export function applyStyles<T = any>(options: applyStylesOptions) {
	return (Component: BlueBaseComponent<T>): BlueBaseComponent<T> => {
		const name = typeof options === 'string' ? options : options.name;

		const ThemedComponent = (props: T) => {
			// const { styles: stylesProp, ...rest } = props;
			const styles = useStyles(name, props, Component.defaultStyles);

			// If we were able to extract any rules, pass them forward in the styles prop
			const finalProps = Object.keys(styles).length > 0 ? { ...props, styles } : props;

			return React.createElement(Component, finalProps);
		};

		ThemedComponent.displayName = 'ThemedComponent';

		return ThemedComponent;
	};
}
