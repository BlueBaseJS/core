import { withBlueRain } from '@blueeast/bluerain-os';

import pageStyle from '../pageStyles';

export default withBlueRain(({ match, appName, bluerain: BR }) => {
	const layout = {
		component: 'View',
		props: { style: pageStyle },
		children: [
			{
				component: 'FormattedMessage',
				props:{
					id:'hello.contact',
					defaultMessage:'Welcome to the contact page!'
				}
			}
		]
	};

	return BR.Utils.parseJsonSchema(layout);
});
