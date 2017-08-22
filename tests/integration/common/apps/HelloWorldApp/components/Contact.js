import  { parseJsonSchema } from '../../../../../../src/utils/JsonSchemaToReact';

import pageStyle from './pageStyles';

export default ({ match, appName }) => {
	const layout = {
		component: 'View',
		props: { style: pageStyle },
		children: [
			{
				component: 'Text',
				text: 'Welcome to the contact page!'
			}
		]
	};

	return parseJsonSchema(layout);
};
