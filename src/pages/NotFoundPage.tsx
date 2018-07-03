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
const NotFoundPage = ({ bluerain: BR }: { bluerain: BlueRain }) => {
	return (
		<BR.Components.Page >
			<BR.Components.CenterLayout style={{ padding: 174 }}>
				<BR.Components.ComponentState
					title="Oooop's!"
					description="Things you are looking for aren't here!"
					imageSource="https://s3-us-west-2.amazonaws.com/bluerainimages/not-found.svg"
					// 	image={FOFIcon}
					descriptionStyle={descriptionStyle}
				/>
			</BR.Components.CenterLayout>
		</BR.Components.Page>
	);
};

export default withBlueRain(NotFoundPage);
