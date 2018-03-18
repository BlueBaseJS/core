import { BlueRain, withBlueRain } from '../../src/index';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('Page', module)
    .add('Only IndexPage', () => {

	const Story = withBlueRain((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const IndexPage = BR.Components.get('IndexPage');

		return <IndexPage />;
	});

	return <Story />;
})
   .add('Only ErrorPage', () => {

	const Story = withBlueRain((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const ErrorPage = BR.Components.get('ErrorPage');

		return <ErrorPage />;
	});

	return <Story />;
})

.add('Only  LoadingPage', () => {

	const Story = withBlueRain((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const LoadingPage = BR.Components.get('LoadingPage');

		return <LoadingPage />;
	});

	return <Story />;
})


.add('only  NotFoundPage', () => {

	const Story = withBlueRain((props: { bluerain: BlueRain }) => {

		const BR = props.bluerain;
		const NotFoundPage = BR.Components.get('NotFoundPage');

		return <NotFoundPage />;
	});

	return <Story />;
});
