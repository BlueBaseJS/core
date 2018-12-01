import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { resolveThunk } from '../../utils';

export interface PluginIconProps {
	slug: string;
	size?: number,
	[key: string]: any
}

export class PluginIcon extends React.PureComponent<PluginIconProps> {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		const { slug, ...rest } = this.props;

		const plugin = BB.Plugins.get(slug);

		if (!plugin) {
			throw new Error(`There's no pluign registered with "${slug}" key in the registry.`);
		}

		if (!plugin.icon) {
			return null;
		}

		const iconProps = resolveThunk(plugin.icon, plugin, BB);

		return <BB.Components.DynamicIcon {...iconProps} {...rest} />;
	}
}
