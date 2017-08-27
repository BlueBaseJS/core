/* @flow */
import RX from 'reactxp';

import { parseJsonSchema } from '../utils/JsonSchemaToReact';

const pageStyle = RX.Styles.createViewStyle({
	justifyContent: 'center',
	padding: 20,
	textAlign: 'center',
}, false);

const titleStyle = RX.Styles.createViewStyle({
	alignSelf: 'center',
	backgroundColor: 'rgba(0,123,255,1)',
	borderColor: 'rgba(0,123,255,1)',
	borderRadius: 10,
	borderWidth: 1,
	color: '#fff',
	fontSize: 68,
	marginBottom: 20,
	padding: 20,
	shadowOffset: { height: 5, width: 0 },
	shadowRadius: 15,
	shadowColor: 'rgba(0,0,0,.3)'
}, false);

const subTitleStyle = RX.Styles.createViewStyle({
	color: 'rgb(150, 150, 150)',
	marginBottom: 20,
}, false);

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
export default function Layout() : RX.Component<*> {
	const schema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [{
			component: 'View',
			props: { style: titleStyle },
			children: [{
				component: 'Text',
				text: 'BR'
			}]
		}, {
			component: 'Text',
			props: { style: subTitleStyle },
			text: 'Welcome to BlueRain OS!',
		}]
	};

	return parseJsonSchema(schema);
}
