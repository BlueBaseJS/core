import { BlueRain, withBlueRain } from '../../index';
import React from 'react';
import storiesOf from '../../../storybook/storiesOf';

storiesOf('StatefulComponent', module)
	.add('StatefulComponent children function prop', () => {

		const Story = withBlueRain((props: { bluerain: BlueRain }) => {
			const BR = props.bluerain;

			return (
				<BR.Components.StatefulComponent>
				{() =>{
					return <BR.Components.Text>Render prop pattern</BR.Components.Text>
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
				<BR.Components.StatefulComponent>
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
				<BR.Components.StatefulComponent>
					{() => {
						throw new Error('Boom!');
					}}
				</BR.Components.StatefulComponent>
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
