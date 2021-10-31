import { BlueBaseApp } from '@bluebase/core';
import BootOptions from '../boot';
import React from 'react';

export const decorators = [
	(Story) => (
		<BlueBaseApp {...BootOptions}>
			<Story />
		</BlueBaseApp>
	),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
