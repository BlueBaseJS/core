import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';
import { resolveThunk } from '../../utils';

export interface PluginIconProps {
	slug: string;
	size?: number,
	[key: string]: any
}

export class PluginIcon extends React.PureComponent<PluginIconProps> {

	render() {

		return (
			<BlueBaseConsumer>
				{(BB: BlueBase) => {

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
				}}
			</BlueBaseConsumer>
		);
	}
}
