import { Styles } from 'reactxp';
import { withBlueRain } from '@blueeast/bluerain-os';

const headerStyle = Styles.createViewStyle({
	backgroundColor: 'rgba(240, 240, 240, 0.5)',
	shadowOffset: { height: 1, width: 0 },
	shadowRadius: 5,
	shadowColor: 'rgba(0, 0, 0, 0.5)'
});

const titleStyle = Styles.createViewStyle({
	fontSize: 18,
	paddingTop: 10,
	paddingLeft: 10,
	paddingRight: 10,
	flexDirection: 'row'
});

const spacerStyle = Styles.createViewStyle({
	flex: 1
});

const navBarStyle = Styles.createViewStyle({
	flexDirection: 'row'
});

const navItemStyle = Styles.createViewStyle({
	padding: 10
});

export default withBlueRain(({ match, appName, bluerain: BR }) => {

	const layout = {
		component: 'View',
		props: { style: headerStyle },
		children: [
			{
				component:'View',
				props:{ style: titleStyle },
				children: [
					{
						component: 'FormattedMessage',
						props: {
							style: titleStyle,
							id: 'hello.header.title',
							defaultMessage: 'Welcome to the {appName}',
							values: { appName }
						}
					}, {
						component: 'View',
						props: { style: spacerStyle }
					}, {
						component: 'Button',
						text: 'Urdu',
						props: {
							onPress: (e) => { BR.Plugins.get('intl').setLocale('ur', BR); }
						}
					}, {
						component: 'Button',
						text: 'English',
						props: {
							onPress: (e) => { BR.Plugins.get('intl').setLocale('en', BR); }
						}
					}
				]
			},
			{
				component: 'View',
				props: { style: navBarStyle },
				children: [
					{
						component: 'Link',
						props: { to: `${match.url}`, style: navItemStyle },
						children: [{
							component: 'FormattedMessage',
							props:{
								id:'hello.header.homeLinkText',
								defaultMessage:'Home'
							}
						}]
					},
					{
						component: 'Link',
						props: { to: `${match.url}/about`, style: navItemStyle },
						children: [{
							component: 'FormattedMessage',
							props:{
								id:'hello.header.aboutLinkText',
								defaultMessage:'About'
							}
						}]
					},
					{
						component: 'Link',
						props: { to: `${match.url}/responsive`, style: navItemStyle },
						children: [{
							component: 'View',
							text: 'Responsive'
						}]
					},
					{
						component: 'Link',
						props: { to: `${match.url}/contact`, style: navItemStyle },
						children: [{
							component: 'FormattedMessage',
							props:{
								id:'hello.header.contactLinkText',
								defaultMessage:'Contact'
							}
						}]
					}
				]
			}
		]
	};

	return BR.Utils.parseJsonSchema(layout);
});
