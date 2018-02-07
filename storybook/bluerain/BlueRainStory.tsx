import { withBlueRain } from '../../src';
import React from 'react';

const bluerainStory = (component: React.ComponentType<any>) => {
	return () => {
		const Story = withBlueRain(component);
		return <Story />;
	}
};

export default bluerainStory;
