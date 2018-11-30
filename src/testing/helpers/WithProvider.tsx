import * as Component from '../../components';
import * as Native from '../../native';
import * as React from 'react';
import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../../themes';
import { BlueBase } from '../../BlueBase';
import { BlueBaseDefaultConfigs } from '../../configs';
import { BlueBaseProvider } from '../../Context';
import { ThemeProvider } from '../../registries';
import systemHooks from '../../hooks';

class WithProvider extends React.Component<any, any>{
	constructor(props: any) {
		super(props);
		this.state = {
			BB: new BlueBase(),
			Component: () => null,
		};
	}

	async componentWillMount() {

		const BB = this.state.BB;

		try {
			const Comp = await boot(this.props.children, BB);
			if (Comp) {
				this.setState({
					Component: Comp,
					booted: BB.booted,
				});
			}
		} catch (error) {
			// tslint:disable-next-line:no-console
			console.error(error);
		}
	}
	render() {
		const Comp = this.state.Component;
		return (
			<Comp/>
		);
	}
}

export async function boot(children: any, BB: BlueBase) {

	await BB.Hooks.registerCollection(systemHooks);
	await BB.Configs.registerCollection(BlueBaseDefaultConfigs);
	await BB.Themes.register(BlueBaseLightTheme);
	await BB.Themes.register(BlueBaseDarkTheme);
	await BB.Components.register('View', Native.View);
	await BB.Components.register('Text', Native.Text);
	await BB.Components.register('Image', Native.Image);
	await BB.Components.register('Button', Native.Button);
	await BB.Components.register('ActivityIndicator', Native.ActivityIndicator);
	await BB.Components.register('LoadingState', Component.LoadingState);
	await BB.Components.register('ComponentState', Component.ComponentState);
	await BB.Components.register('BlueBaseApp', Component.BlueBaseApp);
	await BB.Components.register('BlueBaseHook', Component.BlueBaseHook);
	await BB.Components.register('DataObserver', Component.DataObserver);
	await BB.Components.register('DynamicIcon', Component.DynamicIcon);
	await BB.Components.register('EmptyState', Component.EmptyState);
	await BB.Components.register('ErrorObserver', Component.ErrorObserver);
	await BB.Components.register('ErrorState', Component.ErrorState);
	await BB.Components.register('HoverObserver', Component.HoverObserver);
	await BB.Components.register('JsonSchema', Component.JsonSchema);
	await BB.Components.register('PluginIcon', Component.PluginIcon);
	await BB.Components.register('SystemHeader', Component.Noop);
	await BB.Components.register('SystemContent', Component.SystemContent);
	await BB.Components.register('SystemApp', Component.SystemApp);
	await BB.Components.register('SystemFooter', Component.Noop);
	await BB.Plugins.register({
		icon: {
			source: '',
			type: 'image',
		},
		name: 'DummyPlugin',
		slug: 'dummy-plugin',
	});
	const Root = () => (
		<BlueBaseProvider value={BB}>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</BlueBaseProvider>
	);

	BB.booted = true;

	return Root;
}

export default WithProvider;