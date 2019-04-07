import { BlueBaseApp } from '../../src';
import React from 'react';

export const BlueBaseDecorator = (maybeEsConfigs) => (storyFn) => {
	const configs = maybeEsConfigs.default ? maybeEsConfigs.default : maybeEsConfigs;
	return React.createElement(BlueBaseApp, configs, storyFn());
};
