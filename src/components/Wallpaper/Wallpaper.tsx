import React from 'react';
import { ViewProperties } from 'react-native';
import { withBlueRain, BlueRainType } from '../../index';
import ImageBackground from '../ImageBackground';

/**
 * BlueRain wallpaper, reads wallpaper configs from configs.wallpaper.
 */
const Wallpaper = (props: ViewProperties & { bluerain: BlueRainType }) => {

	const { bluerain: BR, style, ...others } = props;
	const wallpaper = BR.Configs.get('wallpaper');

	const styles = BR.Utils.createStyleSheet([style, { flex: 1 }]);

	return (
		<ImageBackground style={styles} {...wallpaper} {...others} />
	);
};

export default withBlueRain(Wallpaper);
