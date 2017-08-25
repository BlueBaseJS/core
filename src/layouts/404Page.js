/* @flow */
import RX from 'reactxp';

import { parseJsonSchema } from '../utils/JsonSchemaToReact';

/**
 * Returns the main system layout view. This is the first view
 * of the layout heirarcy.
 *
 * @returns {React.Component} The layout react component
 */
export default function Layout() : RX.Component<*> {
	const schema = {
		component: 'Page',

		children: [{
			component: 'Text',
			text: '404!',
		}]
	};

	return parseJsonSchema(schema);
}
