import { DataObserver, LoadingState, Text } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('DataObserver', module)

	.add('Basic Example with children', () => (
		<DataObserver>
			<Text>Text as a children</Text>
		</DataObserver>
	))

	.add('with render prop isLoading:return true isEmpty:return false', () => (
		<DataObserver isEmpty={() => false} isLoading={() => true}>
			{(data: any) => {
				return (
					data.loading ? <LoadingState />
						: data.empty ? <Text>Empty</Text> :
							<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	))

	.add('with render prop isLoading:return false isEmpty:return true', () => (
		<DataObserver isEmpty={() => true} isLoading={() => false}>
			{(data: any) => {
				return (
					data.loading ? <LoadingState /> : data.empty ? <Text>Empty</Text> :
						<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	))

	.add('with render prop isLoading:return false isEmpty:return false', () => (
		<DataObserver isEmpty={() => false} isLoading={() => false}>
			{(data: any) => {

				return (
					data.loading ? <LoadingState /> : data.empty ? <Text>Empty</Text> :
						<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	))

	.add('with render prop loading:true instead of isLoading prop', () => (
		<DataObserver loading={true} isEmpty={() => false}>
			{(data: any) => {

				return (
					data.loading ? <LoadingState /> : data.empty ? <Text>Empty</Text> :
						<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	));