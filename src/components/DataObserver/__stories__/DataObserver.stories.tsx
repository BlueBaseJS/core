import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('DataObserver', module)

	.add('Basic Example with children', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.DataObserver>
				<BB.Components.Text>Text as a children</BB.Components.Text>
			</BB.Components.DataObserver>
		)} />
	))

	.add('with render prop isLoading:return true isEmpty:return false', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.DataObserver isEmpty={() => false} isLoading={() => true}>
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState />
							: data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
								<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</BB.Components.DataObserver>
		)} />
	))

	.add('with render prop isLoading:return false isEmpty:return true', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.DataObserver isEmpty={() => true} isLoading={() => false}>
				{(data: any) => {
					return (
						data.loading ? <BB.Components.LoadingState /> : data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
							<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</BB.Components.DataObserver>
		)} />
	))

	.add('with render prop isLoading:return false isEmpty:return false', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.DataObserver isEmpty={() => false} isLoading={() => false}>
				{(data: any) => {

					return (
						data.loading ? <BB.Components.LoadingState /> : data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
							<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</BB.Components.DataObserver>
		)} />
	))

	.add('with render prop loading:true instead of isLoading prop', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.DataObserver loading={true} isEmpty={() => false}>
				{(data: any) => {

					return (
						data.loading ? <BB.Components.LoadingState /> : data.empty ? <BB.Components.Text>Empty</BB.Components.Text> :
							<BB.Components.Text>Text as a children</BB.Components.Text>
					);
				}}
			</BB.Components.DataObserver>
		)} />
	));