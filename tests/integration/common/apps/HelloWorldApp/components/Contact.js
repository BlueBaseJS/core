import { FormattedMessage } from 'react-intl';
import  { parseJsonSchema } from '../../../../../../src/utils/JsonSchemaToReact';

import pageStyle from './pageStyles';

export default ({ match, appName }) => {
	const layout = {
		component: 'View',
		props: { style: pageStyle },
		children: [
			{
				component: FormattedMessage,
				props:{
					id:'hello.contact',
					defaultMessage:'Welcome to the contact page!'
				}
			}
		]
	};

	return parseJsonSchema(layout);
};
