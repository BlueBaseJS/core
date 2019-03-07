import React from 'react';

export interface NoopProps {
	children?: React.ReactNode,
}

/**
 * # 😐 Noop
 *
 * A component that does... nothing!
 */
export const Noop: React.FunctionComponent<NoopProps> = ({ children }) => {

	if (children && React.isValidElement(children)) {
		return children;
	}

	return null;
};
