import { BlueRain, BlueRainConsumer } from '../../index';
import React from 'react';
import { resolveThunk } from '../../utils';

export interface PluginIconProperties {
	slug: string;
	size?: number,
	[key: string]: any
}

export class PluginIcon extends React.PureComponent<PluginIconProperties> {

	render() {

		return (
			<BlueRainConsumer>
				{(BR: BlueRain) => {

					const { slug, ...rest } = this.props;

					const plugin = BR.Plugins.get(slug);

					if (!plugin) {
						throw new Error(`There's no pluign registered with "${slug}" key in the registry.`);
					}

					if (!plugin.icon) {
						return;
					}

					const iconProps = resolveThunk(plugin.icon, plugin, BR);

					return <BR.Components.DynamicIcon {...iconProps} {...rest} />;
				}}
			</BlueRainConsumer>
		);
	}
}
