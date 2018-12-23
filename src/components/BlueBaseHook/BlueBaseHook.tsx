import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import Loadable from 'react-loadable';
import React from 'react';
import { ReactLoadableLoading } from '../ReactLoadableLoading';

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

		const BB: BlueBase = this.context;

		const AsyncBlueBaseHook = Loadable({
			loader: () => BB.Hooks.run(hook, value, args),
			loading: ReactLoadableLoading,
			render(loadedValue: any) {
				return children(loadedValue);
			}
		});

		return <AsyncBlueBaseHook />;
	}
}
