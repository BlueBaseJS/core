import { BlueBase, BlueBaseConsumer } from '../../..';
import { Text, View } from 'react-native';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const HOC = (Comp: React.ComponentType) => (props: any) => (
  <View style={{ backgroundColor: 'green' }}>
    <Comp {...props} />
  </View>
);

storiesOf('ComponentRegistry', module)

.add('should resolve a Promised component', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => {


		BB.Components.setValue('Foo', Promise.resolve(Text) as any);

		const Foo = BB.Components.resolve('Foo');
		return (<Foo>Some text</Foo>);
	}} />
))

.add('should add an HOC that makes background green', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => {


		BB.Components.setValue('Foo', Text);
		BB.Components.addHocs('Foo', HOC);

		const Foo = BB.Components.resolve('Foo');
		return (<Foo>Some text</Foo>);
	}} />
));