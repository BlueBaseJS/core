import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

// tslint:disable-next-line:no-var-requires
const { Text, View } = require('react-native');

storiesOf('WaitObserver', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<View>
				<Text style={{ size: 10, color: '#999', marginBottom: 20 }}>
				The loading component will render after 1 second, and timeout after 3 seconds.
				</Text>
				<BB.Components.WaitObserver
					delay={1000}
					timeout={3000}
					onTimeout={() => console.log('I timed out :(')}
					onRetry={() => console.log('Somone pressed retry :D')}
					children={(props: any) => <BB.Components.LoadingState {...props} />}
				/>
			</View>
		)} />
	));