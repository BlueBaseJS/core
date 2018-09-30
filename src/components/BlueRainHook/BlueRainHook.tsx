import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';
import Loadable from 'react-loadable';
import React from 'react';

// const example = () => (
// 	<BlueRainHook hook="bluerain.event" value={5} args={{ foo: 'bar' }}>
// 	{(value) => console.log(value)}
// 	</BlueRainHook>
// );

export interface BlueRainHookProperties<T = any> {
	hook: string;
	value: T;
	args?: { [key: string]: any };
	children: ((value: any) => React.ReactNode);
}

/**
 * 🎣 BlueRainHook Component
 */
export class BlueRainHook extends React.PureComponent<BlueRainHookProperties> {

	public static defaultProps = {
		args: {}
	};

	render() {

		const { hook, value, args, children } = this.props;

		return (
			<BlueRainConsumer children={(BR: BlueRain) => {

				const AsyncBlueRainHook = Loadable({
					loader: () => BR.Hooks.run(hook, value, args),
					loading: () => <BR.Components.Text>Loading</BR.Components.Text>,
					render(loadedValue: any) {
						return children(loadedValue);
					}
				});

				return <AsyncBlueRainHook />;

			}} />
		);
	}
}
