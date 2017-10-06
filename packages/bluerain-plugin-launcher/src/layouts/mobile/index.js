import RX from 'reactxp';

const SidebarStyles = RX.Styles.createViewStyle({
	width: '6%',
	justifyContent: 'center',
	alignItems: 'flex-start',
	backgroundColor: 'lightgrey'
});

export default (BR, Content, bannerUrl) => (props) => {

	const layout = 	{

		component: 'View',
		props: { style: SidebarStyles },
		children: [
			{
				component: Content,
				props: { hideLabels: true }
			}]
	};

	return BR.Utils.parseJsonSchema(layout);
};
