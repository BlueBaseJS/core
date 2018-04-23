import { BlueRain, BlueRainConsumer, withBlueRain } from '../../../src';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('StatefulComponent', module)
	.add('StatefulComponent children function prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;

			return (
				<BR.Components.StatefulComponent data="foo">
				{() => {
					return <BR.Components.Text>Render prop pattern</BR.Components.Text>;
				}}
				</BR.Components.StatefulComponent>
			);
		});

		return <Story />;
	})

	.add('StatefulComponent children prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;

			return (
				<BR.Components.StatefulComponent data="foo">
					<BR.Components.Text>This this a child!</BR.Components.Text>
				</BR.Components.StatefulComponent>
			);
		});

		return <Story />;
	})

	.add('StatefulComponent throw error', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;

			return (
				<BR.Components.StatefulComponent data="foo">
					{() => {
						throw new Error('Boom!');
					}}
				</BR.Components.StatefulComponent>
			);
		});

		return <Story />;
	})

	.add('StatefulComponent Component prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;
			const Comp = () => <BR.Components.Text>Hello</BR.Components.Text>;

			return (
				<BR.Components.StatefulComponent data="foo" component={Comp} />
			);
		});

		return <Story />;
	})

	.add('Only loading Component', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;
			const LoadingState = BR.Components.get('LoadingState');

			return <LoadingState />;
		});

		return <Story />;
	})

	.add('null data', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
				<BR.Components.StatefulComponent data={null}>
					<BR.Components.Text>This should never be displayed</BR.Components.Text>
				</BR.Components.StatefulComponent>
			)}
		</BlueRainConsumer>
	))

	.add('undefined data', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
				<BR.Components.StatefulComponent data={undefined}>
					<BR.Components.Text>This should never be displayed</BR.Components.Text>
				</BR.Components.StatefulComponent>
			)}
		</BlueRainConsumer>
	))

	.add('empty array data', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => (
				<BR.Components.StatefulComponent data={[]}>
					<BR.Components.Text>This should never be displayed</BR.Components.Text>
				</BR.Components.StatefulComponent>
			)}
		</BlueRainConsumer>
	))

	.add('Only EmptyState Component', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;
			const EmptyState = BR.Components.get('EmptyState');

			return <EmptyState  />;
		});

		return <Story />;
	})

	.add('Only ErrorState Component', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;
			const ErrorState = BR.Components.get('ErrorState');

			return <ErrorState  />;
		});

		return <Story />;
	});


// storiesOf('ComponentState', module).add('Simple', () => <div>hello </div>);
