import { withBlueRain } from '@blueeast/bluerain-os';

import pageStyle from './pageStyles';

export default withBlueRain(({ match, appName, bluerain: BR }) => {
	const layout = {
		component: 'View',
		props: { style: pageStyle },
		children: [
			{
				component: 'FormattedMessage',
				props:{
					id:'hello.home',
					defaultMessage: 'Welcome to the home page! default'
				}
			},
			{
				component: 'FormattedNumber',
				props: {
					value: 10000
				}
			},
			{
				component: 'FormattedDate',
				props: {
					value: Date.now()
				}
			}
		]
	};

	return BR.Utils.parseJsonSchema(layout);
});
