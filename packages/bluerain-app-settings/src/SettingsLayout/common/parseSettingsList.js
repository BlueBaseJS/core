import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export type SettingItemType = {
	path: string,
	listItemProps: {},
	main: Function
};

export type SettingsListType = [ SettingItemType | '-' ];

function listSchema(items) {
	return {
		component: List,
		children: items.map(item => ({ component: ListItem, props: item.listItemProps }))
	};
}

function createSets(list) {
	const sets = [];
	let tempSet = [];

	// Create sets of lists and dividers
	list.forEach((item) => {

		if (item === '-') {

			if (tempSet.length > 0) {
				sets.push(tempSet);
			}

			sets.push('-');
			tempSet = [];
		} else {
			tempSet.push(item);
		}

	});

	if (tempSet.length > 0) {
		sets.push(tempSet);
	}

	return sets;
}

const parseSettingsList = (list, style) => {

	const sets = createSets(list);

	return {
		component: 'View',
		props: { style },
		children: sets.map((item) => {
			if (item === '-') {
				return { component: Divider };
			}
			return listSchema(item);

		})
	};
};

export default parseSettingsList;
