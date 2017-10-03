import RX from 'reactxp';

const SidebarStyles = RX.Styles.createViewStyle({
	width: '20%',
});

export default (BR, Content) => (props) => {

	const layout = 	{

		// Sidebar Layout
		component: 'View',
		props: { style: SidebarStyles },
		children: [
			{
				component: Content
			}]
	};

	return BR.Utils.parseJsonSchema(layout);
};
