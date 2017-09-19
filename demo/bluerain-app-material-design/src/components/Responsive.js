import RX from 'reactxp';
import { withBlueRain } from '@blueeast/bluerain-os';

const styleView = RX.Styles.createViewStyle({
	padding: 20,
	width: '100%',
	height: '100%',
	textAlign: 'center'
});

const sizeText = RX.Styles.createViewStyle({
	fontSize: 70,
	paddingBottom: 10,
	paddingTop: 10,
	fontWeight: 600,
	color: 'rgba(255,255,255,1)'
});

const subtitleText = RX.Styles.createViewStyle({
	fontSize: 18,
	paddingBottom: 5,
	paddingTop: 5,
	color: 'rgba(255,255,255,1)'
});

const descriptionText = RX.Styles.createViewStyle({
	fontSize: 14,
	paddingBottom: 5,
	paddingTop: 5,
	color: 'rgba(255,255,255,.5)'
});


const pageContent = (size, BR) => {
	let title;
	let bg;

	switch (size) {
	case 'xs':
		title = 'Extra Small';
		bg = '#007bff';
		break;
	case 'sm':
		title = 'Small';
		bg = '#28a745';
		break;
	case 'md':
		title = 'Medium';
		bg = '#dc3545';
		break;
	case 'lg':
		title = 'Large';
		bg = '#17a2b8';
		break;
	case 'xl':
		title = 'Extra Large';
		bg = '#868e96';
		break;
	default:
		break;
	}

	const subtitle = `${title} Layout`;
	const description =
    'Try changing browser window width to see the layout change.';

	return BR.Utils.parseJsonSchema({
		component: 'View',
		props: {
			style: [
				styleView,
				RX.Styles.createViewStyle({ backgroundColor: bg }, false)
			]
		},
		children: [
			{
				component: 'Text',
				props: { style: sizeText },
				text: size
			},
			{
				component: 'Text',
				props: { style: subtitleText },
				text: subtitle
			},
			{
				component: 'Text',
				props: { style: descriptionText },
				text: description
			}
		]
	});
};

export default withBlueRain(({ match, appName, bluerain: BR }) => {
	const layout = {
		component: 'ResponsiveLayout',
		props: {
			default: () => pageContent('default', BR),
			xs: () => pageContent('xs', BR),
			sm: () => pageContent('sm', BR),
			md: () => pageContent('md', BR),
			lg: () => pageContent('lg', BR),
			xl: () => pageContent('xl', BR),
		}
	};

	return BR.Utils.parseJsonSchema(layout);
});
