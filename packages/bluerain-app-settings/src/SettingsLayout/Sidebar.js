import { withBlueRain } from '@blueeast/bluerain-os';
import parseSettingsList from './parseSettingsList';

const Sidebar = ({ match, bluerain: BR, items }) => {

	const history = BR.refs.router.history;

	// Add onClick Events
	items = items.map((item) => {
		if (item.path && item.listItemProps && !item.listItemProps.onClick) {
			item.listItemProps = Object.assign({}, item.listItemProps, {
				onClick: () => history.push(`${match.url.replace(/\/+$/, '')}/${item.path}`)
			});
		}
		return item;
	});

	let schema = parseSettingsList(items);

	schema = BR.Filters.run('app.settings.sidebar', schema);

	return BR.Utils.parseJsonSchema(schema);
};

export default withBlueRain(Sidebar);
