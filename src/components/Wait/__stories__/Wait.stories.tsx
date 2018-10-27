import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

// tslint:disable-next-line:no-var-requires
const { Text, View } = require('react-native');

// const Loading = ({ timedOut }: any) => {

// 	if (!timedOut) {
// 		return (
// 			<Text>Loading, please wait...</Text>
// 		);
// 	}

// 	return (
// 		<Text>This is taking longer than usual :(</Text>
// 	);
// };

storiesOf('Wait', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<View>
				<Text>The loading component will render after 1 second, and timeout after 3 seconds.</Text>
				<BB.Components.Wait
					delay={1000}
					timeout={3000}
					component={BB.Components.LoadingState}
					onTimeout={() => console.log('I timed out :(')}
					onRetry={() => console.log('Somone pressed retry :D')}
				/>
			</View>
		)} />
	));