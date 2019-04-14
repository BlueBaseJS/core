import { NoopProps } from '@bluebase/components';
import React from 'react';

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
