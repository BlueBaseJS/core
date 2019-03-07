import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import Loadable from 'react-loadable';
import React from 'react';
import { ReactLoadableLoading } from '../ReactLoadableLoading';

export interface BlueBaseHookProps<T = any> {

	/** Event name */
	hook: string;

	/** Initial value to hook */
	value: T;

	/** Hook arguments */
	args?: { [key: string]: any };

	/** Children as function (render prop pattern). Final value is passed as param to this function. */
	children: ((value: any) => React.ReactNode);

  /**
   * Used to locate this view in end-to-end tests.
   */
	testID?: string,
}

/**
 * # 🎣 BlueBaseHook
 *
 * Since hooks in BlueBase are based on promises, it may be tedious to handle loading state,
 * error state, etc. It may also become a repetitive task.
 *
 * To solve this issue, we ship BlueBaseHook component. Just pass name of hook, initial value,
 * and hook arguments as props. The final hooked value will be passed to the children function.
 * This component will handle loading and error states itself.
 *
 * ## Usage
 * ```jsx
 * <BlueBaseHook hook="math" value={5} args={{ op: 'add' }} children={(val: number) => {
 * 	return <Text>{val}</Text>;
 * }} />
 * ```
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
			loader: () => BB.Filters.run(hook, value, args),
			loading: ReactLoadableLoading,
			render(loadedValue: any) {
				return children(loadedValue);
			}
		});

		return <AsyncBlueBaseHook />;
	}
}
