import { withBlueRain  } from '@blueeast/bluerain-os';

const ListExampleSettings = ({ bluerain: BR }) => {


	let schema = {
		component: 'View',
		children: []
	};

	schema = BR.Filters.run('app.settings.general', schema);

	return BR.Utils.parseJsonSchema(schema);
};

// primaryText={<FormattedMessage id="app.settings.language" defaultMessage="Language" />}
// secondaryText={<FormattedMessage id="app.settings.language.description" defaultMessage="Select your preferred language" />}

export default withBlueRain(ListExampleSettings);
