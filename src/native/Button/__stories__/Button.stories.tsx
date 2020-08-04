import { Button } from '../Button';
import React from 'react';
import { View } from '../../View';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('Button', module)
	.add('With default props', () => <Button>Hello</Button>)

	.add('color options', () => (
		<View>
			<View style={{ padding: 8 }}>
				<Button color="default">Default</Button>
			</View>
			<View style={{ padding: 8 }}>
				<Button color="primary">Primary</Button>
			</View>
			<View style={{ padding: 8 }}>
				<Button color="secondary">Secondary</Button>
			</View>
		</View>
	))

	.add('width', () => (
		<View>
			<View style={{ padding: 8 }}>
				<Button color="primary">Normal</Button>
			</View>
			<View style={{ padding: 8 }}>
				<Button color="primary" fullWidth={true}>
					Full Width
				</Button>
			</View>
		</View>
	));
