import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { DynamicIcon } from '../../getComponent';
import React from 'react';
import { resolveThunk } from '../../utils';

export interface PluginIconProps {

	/** Plugin key */
	id: string;

	/** Icon size */
	size?: number,

	[key: string]: any
}

/**
 * # 🔌 PluginIcon
 *
 * Displays an icon of a Plugin. The icon properties are taken from plugin.icon property
 * of plugin.
 *
 * If no pluign is found, renders an error message.
 *
 * If a plugin has no icon, renders null.
 *
 * ## Usage:
 * ```jsx
 * <PluginIcon id="redux-plugin" />
 * ```
 *
 * TODO: In future, add a default icon.
 */
export class PluginIcon extends React.PureComponent<PluginIconProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const { id, size } = this.props;

		const plugin = BB.Plugins.get(id);

		if (!plugin) {
			throw new Error(`There's no pluign registered with "${id}" key in the registry.`);
		}

		if (!plugin.icon) {
			return null;
		}

		const iconProps = resolveThunk(plugin.icon, { plugin, size }, BB);

		return <DynamicIcon {...iconProps} size={size} />;
	}
}
