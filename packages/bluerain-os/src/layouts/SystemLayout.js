/* @flow */

import BR from '../index';
import { withWindowInfo } from '../plugins/WindowInfoPlugin';
import  createStyleSheet  from '../utils/createStyleSheet';

const defaultStyle = createStyleSheet({
	flex: 1,
	overflow: 'auto',
	flexDirection: 'row'
}, 'View');

const  SystemLayout = (props) => {


	/**
	 * Whenever the screen/window size changes, notify redux to
	 * update `state.bluerain.window` object.
	 */
	//eslint-disable-next-line
	const onLayout = () => {
		//eslint-disable-next-line
		const newDimentions = RX.UserInterface.measureWindow();
		const oldDimentions = this.props.window;

		if (newDimentions.width !== oldDimentions.width || newDimentions.height !== oldDimentions.height) {
			this.props.setWindowDimentions(newDimentions.width, newDimentions.height);
		}
	};


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

};

export default withWindowInfo(SystemLayout);
