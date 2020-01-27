import { useComponent, useIntl } from '../../hooks';

import { FormattedMessageProps } from '@bluebase/components';
import React from 'react';

export const FormattedMessage = (props: FormattedMessageProps) => {
	const Text = useComponent('Text');

	const { children, component = Text, ...rest } = props;
	const intl = useIntl();

	const Component = component as any;

	if (typeof children !== 'string' || !intl) {
		return React.createElement(Component, rest, children);
	}

	const { __ } = intl;

	return React.createElement(Component, rest, __(children));
};
