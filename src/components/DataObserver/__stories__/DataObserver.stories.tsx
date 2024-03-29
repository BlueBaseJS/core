import { DataObserverProps, LoadingStateProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';
import { Text } from '../../../native';

const DataObserver = getComponent<DataObserverProps>('DataObserver');
const LoadingState = getComponent<LoadingStateProps>('LoadingState');

storiesOf('DataObserver', module)
	.add('Basic Example with children', () => (
		<DataObserver>
			<Text>Text as a children</Text>
		</DataObserver>
	))

	.add('with render prop isLoading:return true isEmpty:return false', () => (
		<DataObserver isEmpty={() => false} isLoading={() => true}>
			{(data: any) => {
				return data.loading ? (
					<LoadingState />
				) : data.empty ? (
					<Text>Empty</Text>
				) : (
					<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	))

	.add('with render prop isLoading:return false isEmpty:return true', () => (
		<DataObserver isEmpty={() => true} isLoading={() => false}>
			{(data: any) => {
				return data.loading ? (
					<LoadingState />
				) : data.empty ? (
					<Text>Empty</Text>
				) : (
					<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	))

	.add('with render prop isLoading:return false isEmpty:return false', () => (
		<DataObserver isEmpty={() => false} isLoading={() => false}>
			{(data: any) => {
				return data.loading ? (
					<LoadingState />
				) : data.empty ? (
					<Text>Empty</Text>
				) : (
					<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	))

	.add('with render prop loading:true instead of isLoading prop', () => (
		<DataObserver loading isEmpty={() => false}>
			{(data: any) => {
				return data.loading ? (
					<LoadingState />
				) : data.empty ? (
					<Text>Empty</Text>
				) : (
					<Text>Text as a children</Text>
				);
			}}
		</DataObserver>
	));
