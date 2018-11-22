import * as Component from '../../components';
import * as Native from '../../native';
import * as React from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseProvider } from '../../Context';

const WithProvider = ({ children }: { children: any }) => {
	const BB = new BlueBase();
	BB.boot();
	BB.Components.register('View', Native.View);
	BB.Components.register('Text', Native.Text);
	BB.Components.register('Image', Native.Image);
	BB.Components.register('Button', Native.Button);
	BB.Components.register('ActivityIndicator', Native.ActivityIndicator);
	BB.Components.register('LoadingState', Component.LoadingState);
	BB.Components.register('ComponentState', Component.ComponentState);
	BB.Components.register('BlueBaseApp', Component.BlueBaseApp);
	BB.Components.register('BlueBaseHook', Component.BlueBaseHook);
	BB.Components.register('DataObserver', Component.DataObserver);
	BB.Components.register('DynamicIcon', Component.DynamicIcon);
	BB.Components.register('EmptyState', Component.EmptyState);
	BB.Components.register('ErrorObserver', Component.ErrorObserver);
	BB.Components.register('ErrorState', Component.ErrorState);
	BB.Components.register('HoverObserver', Component.HoverObserver);
	BB.Components.register('JsonSchema', Component.JsonSchema);
	BB.Components.register('PluginIcon', Component.PluginIcon);
	return (
		<BlueBaseProvider value={BB}>
			{children}
		</BlueBaseProvider>
	);
};

export default WithProvider;