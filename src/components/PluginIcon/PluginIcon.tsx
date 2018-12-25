import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { DynamicIcon } from '../../getComponent';
import React from 'react';
import { resolveThunk } from '../../utils';

export interface PluginIconProps {
	id: string;
	size?: number,
	[key: string]: any
}

/**
 * 🔌 PluginIcon
 */
export class PluginIcon extends React.PureComponent<PluginIconProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const { id, ...rest } = this.props;

		const plugin = BB.Plugins.get(id);

		if (!plugin) {
			throw new Error(`There's no pluign registered with "${id}" key in the registry.`);
		}

		if (!plugin.icon) {
			return null;
		}

		const iconProps = resolveThunk(plugin.icon, plugin, BB);

		return <DynamicIcon {...iconProps} {...rest} />;
	}
}
