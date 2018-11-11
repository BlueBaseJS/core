import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import Loadable from 'react-loadable';
import React from 'react';

// const example = () => (
// 	<BlueBaseHook hook="bluebase.event" value={5} args={{ foo: 'bar' }}>
// 	{(value) => console.log(value)}
// 	</BlueBaseHook>
// );

export interface BlueBaseHookProps<T = any> {
	hook: string;
	value: T;
	args?: { [key: string]: any };
	children: ((value: any) => React.ReactNode);
}

/**
 * 🎣 BlueBaseHook Component
 */
export class BlueBaseHook extends React.PureComponent<BlueBaseHookProps> {

	public static defaultProps = {
		args: {}
	};

	render() {

		const { hook, value, args, children } = this.props;

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => {

				const AsyncBlueBaseHook = Loadable({
					loader: () => BB.Hooks.run(hook, value, args),
					loading: () => <BB.Components.Text>Loading</BB.Components.Text>,
					render(loadedValue: any) {
						return children(loadedValue);
					}
				});

				return <AsyncBlueBaseHook />;

			}} />
		);
	}
}
