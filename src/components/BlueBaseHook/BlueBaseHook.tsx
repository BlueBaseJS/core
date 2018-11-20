import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
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

	static contextType = BlueBaseContext;

	public static defaultProps = {
		args: {}
	};

	render() {

		const { hook, value, args, children } = this.props;

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		const AsyncBlueBaseHook = Loadable({
			loader: () => BB.Hooks.run(hook, value, args),
			loading: () => <BB.Components.LoadingState />,
			render(loadedValue: any) {
				return children(loadedValue);
			}
		});

		return <AsyncBlueBaseHook />;
	}
}
