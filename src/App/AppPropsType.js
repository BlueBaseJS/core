import RX from 'reactxp';

export type Props = {
	appName: string,
	component: RX.Component<any>,
	slug: string,
	category: string,
	description: string,
	version: string,
	appRoutePrefix: string,
};
