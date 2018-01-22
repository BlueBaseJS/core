import React from 'react';
// import ImageProperties from 'react-native';
import { withBlueRain } from '../../index';
import ImageBackground from '../ImageBackground';

export type WallpaperProps = {

};

/**
 * BlueRain wallpaper, reads wallpaper configs from configs.wallpaper.
 */
const Wallpaper = (props) => {

	const { bluerain: BR, style, resizeMode, ...others } = props;
	const wallpaper = BR.Configs.get('wallpaper');

	const styles = { ...style, flex: 1 };

	return (
		<ImageBackground style={styles} {...wallpaper} {...others} />
	);
};

export default withBlueRain(Wallpaper);
