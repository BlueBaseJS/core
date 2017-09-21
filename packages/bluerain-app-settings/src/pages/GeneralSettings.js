import { withBlueRain  } from '@blueeast/bluerain-os';

const ListExampleSettings = ({ bluerain: BR }) => {


	let schema = {
		component: 'View',
		children: []
	};

	schema = BR.Filters.run('app.settings.general', schema);

	return BR.Utils.parseJsonSchema(schema);
};

export default withBlueRain(ListExampleSettings);
