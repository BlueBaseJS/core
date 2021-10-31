import storiesOf from '@bluebase/storybook-addon';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import { BlueBase, BlueBaseConsumer } from '../../';
import { useBlueBase } from '../../hooks';
import { BlueBaseApp } from '../../OfflineComponents';
import { WillMountLogger } from './WillMountLogger';

const HOC = (Comp: React.ComponentType) => (props: any) => (
	<View style={{ backgroundColor: 'green' }}>
		<Comp {...props} />
	</View>
);

const ReRendererWithCache = () => {
	const BB = useBlueBase();
	const [renders, setRenders] = useState(1);
	const rerender = () => setRenders(renders + 1);

	const WillMountLoggerComponent = BB.Components.resolveFromCache('WillMountLogger');

	return (
		<View style={{ paddingVertical: 8 }}>
			<Text>ReRendererWithCache</Text>
			<Button title={`Renders: ${renders}`} onPress={rerender} />
			<WillMountLoggerComponent renders={renders} />
		</View>
	);
};

const ReRendererWithoutCache = () => {
	const BB = useBlueBase();
	const [renders, setRenders] = useState(1);
	const rerender = () => setRenders(renders + 1);

	const WillMountLoggerComponent = BB.Components.resolve('WillMountLogger');

	return (
		<View style={{ paddingVertical: 8 }}>
			<Text>ReRendererWithCache</Text>
			<Button title={`Renders: ${renders}`} onPress={rerender} />
			<WillMountLoggerComponent renders={renders} />
		</View>
	);
};

storiesOf('ComponentRegistry', module)
	.add('should resolve a Promised component', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => {
				BB.Components.setValue('Foo', Promise.resolve(Text) as any);

				const Foo = BB.Components.resolve('Foo');
				return <Foo>Some text</Foo>;
			}}
		</BlueBaseConsumer>
	))

	.add('should add an HOC that makes background green', () => (
		<BlueBaseConsumer>
			{(BB: BlueBase) => {
				BB.Components.setValue('Foo', Text);
				BB.Components.addHocs('Foo', HOC);

				const Foo = BB.Components.resolve('Foo');
				return <Foo>Some text</Foo>;
			}}
		</BlueBaseConsumer>
	))

	.add('resolveFromCache', () => (
		<BlueBaseApp components={{ WillMountLogger }}>
			<ReRendererWithCache />
			<ReRendererWithoutCache />
		</BlueBaseApp>
	));
