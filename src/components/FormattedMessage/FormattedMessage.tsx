import { IntlContext, IntlContextData } from '../../intl';
import { FormattedMessageProps } from '@bluebase/components';
import React from 'react';
import { Text } from '../../getComponent';


export class FormattedMessage extends React.PureComponent<FormattedMessageProps> {

	static contextType = IntlContext;

	static defaultProps: Partial<FormattedMessageProps> = {
		component: Text
	};

	render() {
		const { children, component, ...rest } = this.props;
		const { __ }: IntlContextData = this.context;

		const Component = component as any;

		if (typeof children !== 'string') {
			return React.createElement(Component, rest, children);
		}

		return React.createElement(Component, rest, __(children));
	}
}
