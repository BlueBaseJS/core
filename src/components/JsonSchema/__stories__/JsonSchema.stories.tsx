import { JsonSchema } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('JsonSchema', module)

	.add('With default props', () => (
		<JsonSchema schema={{
			component: 'Text',
			props: {
				style: {
					color: 'red'
				}
			},
			text: 'This componenet is generated through JsonSchema Component',
		}} />
	));