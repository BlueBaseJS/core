import { BlueRainType, withBlueRain } from '../../index';
import React from 'react';
import storiesOf from '../../../storybook/storiesOf';

storiesOf('ComponentState', module)
	.add('Only title', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');

			return <ComponentState title="A simple state" />;
		});

		return <Story />;
	})
	.add('Only description', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;
			const ComponentState = BR.Components.get('ComponentState');

			return <ComponentState description="A simple description" />;
		});

		return <Story />;
	});


// storiesOf('ComponentState', module).add('Simple', () => <div>hello </div>);
