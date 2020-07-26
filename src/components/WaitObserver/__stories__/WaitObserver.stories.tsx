import { Text, View } from 'react-native';

import { LoadingStateProps } from '@bluebase/components';
import React from 'react';
import { WaitObserver } from '../WaitObserver';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const LoadingState = getComponent<LoadingStateProps>('LoadingState');

storiesOf('WaitObserver', module).add('Basic Example', () => (
	<View>
		<Text style={{ fontSize: 10, color: '#999', marginBottom: 20 }}>
			The loading component will render after 1 second, and timeout after 3 seconds.
		</Text>
		<WaitObserver
			delay={1000}
			timeout={3000}
			onTimeout={() => console.log('I timed out :(')}
			onRetry={() => console.log('Somone pressed retry :D')}
		>
			{(props: any) => <LoadingState {...props} />}
		</WaitObserver>
	</View>
));
