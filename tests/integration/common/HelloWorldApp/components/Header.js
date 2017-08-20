import { Styles } from 'reactxp';
import  { parseJsonSchema } from '../../../../../src/utils/JsonSchemaToReact';

const headerStyle = Styles.createViewStyle({
	backgroundColor: '#eee',
	shadowOffset: { height: 1, width: 0 },
	shadowRadius: 5
});

const titleStyle = Styles.createViewStyle({
	fontSize: 18,
	paddingTop: 10,
	paddingLeft: 10,
	paddingRight: 10
});

const navBarStyle = Styles.createViewStyle({
	flexDirection: 'row'
});

const navItemStyle = Styles.createViewStyle({
	padding: 10
});

export default ({ match, appName }) => {
	const layout = {
		component: 'View',
		props: { style: headerStyle },
		children: [
			{
				component: 'Text',
				props: { style: titleStyle },
				text: `Welcome to the ${appName} app!`
			},
			{
				component: 'View',
				props: { style: navBarStyle },
				children: [
					{
						component: 'Link',
						props: { to: `${match.url}`, style: navItemStyle },
						children: [{
							component: 'Text',
							text: 'Home'
						}]
					},
					{
						component: 'Link',
						props: { to: `${match.url}/about`, style: navItemStyle },
						children: [{
							component: 'Text',
							text: 'About'
						}]
					},
					{
						component: 'Link',
						props: { to: `${match.url}/contact`, style: navItemStyle },
						children: [{
							component: 'Text',
							text: 'Contact'
						}]
					}
				]
			}
		]
	};

	return parseJsonSchema(layout);
};
