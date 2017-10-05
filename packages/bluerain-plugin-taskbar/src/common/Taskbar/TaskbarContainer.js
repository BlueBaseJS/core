// @flow

import React from 'react';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';

import TaskbarComponent from './TaskbarComponent';

const TaskbarContainer = (props: {
	bluerain: BlueRain
}) => {

	const { systemNav, bluerain: BR } = props;
	const hideLabels = systemNav.hideLabels;

	// Items
	let items = BR.Configs.get('plugins.taskbar.items') || [];
	items = BR.Filters.run('plugin.taskbar.items', items);

	items = items.map((item) => {
		if (item === '-') {
			return {
				component: 'NavDividerItem'
			};
		} else if (item === '->') {
			return {
				component: 'NavSpacerItem'
			};
		}

		item.props = item.props || {};
		item.props.hideLabel = hideLabels;
		return item;
	});

	return (
  <TaskbarComponent hideLabels={hideLabels} open={systemNav.open} docked={systemNav.docked}>
    {BR.Utils.parseJsonSchema(items)}
  </TaskbarComponent>
	);
};

export default withBlueRain(TaskbarContainer);
