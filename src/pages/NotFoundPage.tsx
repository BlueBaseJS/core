import { BlueRain, withBlueRain } from '../index';
// import Icon from '../components/Icon';
import React from 'react';

// Components

// Custom Components
// const FOFIcon = () => <Icon title="404" />;

/**
 * Returns the 404 Page.
 *
 * @returns {React.Component} The layout react component
 */
const descriptionStyle = {
	marginTop: 10
};
const ButtonStyle = {
	backgroundColor: '#5c6ac4',
	color: '#fff'

};
const NotFoundPage = ({ bluerain: BR }: { bluerain: BlueRain }) => {

	const buttonOnPress = () => {
		const route: any = BR.refs ? BR.refs : {};
		if (route) {
			return route.router.history.goBack();

		} else { return null; }
	};
	return (
		<BR.Components.Page >
			<BR.Components.CenterLayout style={{ height:100 +'vh' }}>
				<BR.Components.ComponentState
					title="Oooop's!"
					description="Things you are looking for aren't here!"
					imageSource="https://s3-us-west-2.amazonaws.com/bluerainimages/not-found.svg"
					buttonOnPress={buttonOnPress}
					descriptionStyle={descriptionStyle}
					buttonTitle="goBack"
					buttonStyle={ButtonStyle}
				/>
			</BR.Components.CenterLayout>
		</BR.Components.Page>
	);
};

export default withBlueRain(NotFoundPage);
