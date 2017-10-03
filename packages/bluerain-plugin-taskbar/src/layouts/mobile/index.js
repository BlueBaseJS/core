import RX from 'reactxp';

const SidebarStyles = RX.Styles.createViewStyle({
	width: '60px',
	justifyContent: 'center',
	alignItems: 'flex-start',
	backgroundColor: 'lightgrey'
});

export default (BR, Content) => (props) => {

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
