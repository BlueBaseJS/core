import { App as BlueRainApp, AppOptions, BlueRain, BlueRainConsumer, createApp } from '../../src';
import React from 'react';

export default (config: AppOptions) => {

	const App = () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => (
				<BR.Components.Page>
					<BR.Components.CenterLayout style={{ padding: 20 }}>
						<BR.Components.ComponentState
							title={config.appName}
							description={`slug: ${config.slug}`}
							imageSource={config.iconUrl}
						/>
					</BR.Components.CenterLayout>
				</BR.Components.Page>
			)}
		</BlueRainConsumer>
	);

	return createApp(App, config) as BlueRainApp;
};
