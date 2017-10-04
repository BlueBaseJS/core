import RX from 'reactxp';

const LayoutStyles = RX.Styles.createViewStyle({
	flexDirection: 'row',
	overflow: 'auto',
	flexGrow: 1,
});

const MainStyles = RX.Styles.createViewStyle({
	flex: 1
});

export default (BR, Content, bannerUrl) => (props) => {


	const layout = 	{
			// Main Layout
		component: 'View',
		props: { style: LayoutStyles },
		children: [

			// Main Container
			{
				component: 'div',
				props: { style: { flex:1,
					backgroundImage: `url(${bannerUrl})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}
				},
				children: [{
					component: Content,
					props: { style: { width: '100%' } }
				}]
			}]
	};
	return BR.Utils.parseJsonSchema(layout);
};
