import { BlueBase, BlueBaseApp } from '@bluebase/core';
import React from 'react';

export const BlueBaseDecorator = (maybeEsConfigs) => (storyFn) => {

	const configs = maybeEsConfigs.default ? maybeEsConfigs.default : maybeEsConfigs;

	return (
		<BlueBaseApp {...configs} children={storyFn()} />
	);
};
