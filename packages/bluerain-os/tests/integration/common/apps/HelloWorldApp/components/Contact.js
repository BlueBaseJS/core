import { FormattedMessage } from 'react-intl';
import BR from '../../../../../../src';

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

	return BR.Utils.parseJsonSchema(layout);
};