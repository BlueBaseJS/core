/* @flow */

import RX from 'reactxp';
import BR from '../index';
import { withWindowInfo } from '../plugins/WindowInfoPlugin';

const defaultStyle = RX.Styles.createViewStyle({
	flex: 1,
	overflow: 'auto',
	flexDirection: 'row'
}, false);

class SystemLayout extends RX.Component {

	onLayout: Function;

	constructor(props) {
		super(props);
		this.onLayout = this.onLayout.bind(this);
	}

	/**
	 * Whenever the screen/window size changes, notify redux to
	 * update `state.bluerain.window` object.
	 */
	onLayout() {
		const newDimentions = RX.UserInterface.measureWindow();
		const oldDimentions = this.props.window;

		if (newDimentions.width !== oldDimentions.width || newDimentions.height !== oldDimentions.height) {
			this.props.setWindowDimentions(newDimentions.width, newDimentions.height);
		}
	}

	render() {
		const { children, style, ...other } = this.props;
		const schema = {
			component: 'View',
			props: {
				onLayout: this.onLayout,
				style: [defaultStyle, style],
				...other
			},
			children: [{
				component: 'View', // System Content
				text: children,
				props: { style: { flexGrow: 1, flex: 1 } }
			}]
		};
		const layout = BR.Filters.run('bluerain.system.app.layout', schema);
		return BR.Utils.parseJsonSchema(layout);
	}
}

export default withWindowInfo(SystemLayout);
