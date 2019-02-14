import React from 'react';

/**
 * Props for the Router component
 */
export interface NavigationProviderProps {
	component: React.ComponentType<any>,

	[key: string]: any,
}

/**
 * 🔀 NavigationProvider
 *
 * This is a stub router. Intended to be replaced by an external router plugin.
 */
export const NavigationProvider = ({ component: Component }: NavigationProviderProps) => (<Component />);