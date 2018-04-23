import { BlueRain, withBlueRain } from '../../index';
import { ImageBackgroundProperties } from '../ImageBackground';
import React from 'react';

export interface WallpaperProperties extends Partial<ImageBackgroundProperties> {}

/**
 * BlueRain wallpaper, reads wallpaper configs from configs.wallpaper.
 */
const Wallpaper = (props: WallpaperProperties & { bluerain: BlueRain }) => {
	const { bluerain: BR, style = {}, ...others } = props;
	const wallpaper = BR.Configs.get('wallpaper');

	const styles = { ...style, flex: 1 };

	return (
		<BR.Components.ImageBackground style={styles} {...others} {...wallpaper} />
	);
};

export default withBlueRain(Wallpaper) as React.ComponentType<WallpaperProperties>;
