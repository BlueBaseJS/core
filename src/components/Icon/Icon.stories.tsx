import { BlueRainType, withBlueRain } from '../../index';
import Icon from '../Icon/Icon';
import React from 'react';
import storiesOf from '../../../storybook/storiesOf';
storiesOf('Icon', module)
	.add('Only title', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;

			return <Icon title="simple Icon" />;
		});

		return <Story />;
	})


	.add('Icon with color', () => {

		const Story = withBlueRain((props: { bluerain: BlueRainType }) => {

			const BR = props.bluerain;

			return <Icon  title="simple Icon" color="green"/>;
		});

		return <Story />;
	});



// storiesOf('ComponentState', module).add('Simple', () => <div>hello </div>);
