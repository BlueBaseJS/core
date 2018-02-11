import { BlueRain, withBlueRain, } from '../index';

// Components
import Icon from '../components/Icon';

import React from 'react';


// Custom Components
const BRIcon = () => <Icon title="BR" color="rgba(0,123,255,1)" />;

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
const IndexPage = ({ bluerain: BR }: { bluerain: BlueRain }) => (
	<BR.Components.Wallpaper>
		<BR.Components.Page>
			<BR.Components.CenterLayout style={{ padding: 20 }}>
				<BR.Components.ComponentState title="Welcome to BlueRain OS!" image={BRIcon} />
			</BR.Components.CenterLayout>
		</BR.Components.Page>
	</BR.Components.Wallpaper>
);

export default withBlueRain(IndexPage);
