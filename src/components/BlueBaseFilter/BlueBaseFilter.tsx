import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { BlueBaseFilterProps } from '@bluebase/components';
import Loadable from 'react-loadable';
import React from 'react';
import { ReactLoadableLoading } from '../ReactLoadableLoading';

/**
 * # 🚇 BlueBaseFilter
 *
 * Since filters in BlueBase are based on promises, it may be tedious to handle loading state,
 * error state, etc. It may also become a repetitive task.
 *
 * To solve this issue, we ship BlueBaseFilter component. Just pass name of filter, initial value,
 * and filter arguments as props. The final filtered value will be passed to the children function.
 * This component will handle loading and error states itself.
 *
 * ## Usage
 * ```jsx
 * <BlueBaseFilter filter="math" value={5} args={{ op: 'add' }} children={(val: number) => {
 * 	return <Text>{val}</Text>;
 * }} />
 * ```
 */
export class BlueBaseFilter extends React.PureComponent<BlueBaseFilterProps> {
	static contextType: React.Context<BlueBase> = BlueBaseContext;

	public static defaultProps = {
		args: {},
	};

	render() {
		const { filter, value, args, children } = this.props;

		const BB: BlueBase = this.context;

		const AsyncBlueBaseFilter = Loadable({
			loader: () => BB.Filters.run(filter, value, args),
			loading: ReactLoadableLoading,
			render(loadedValue: any) {
				return children(loadedValue);
			},
		});

		return <AsyncBlueBaseFilter />;
	}
}
