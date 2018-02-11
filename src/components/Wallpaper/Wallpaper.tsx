import { BlueRain, withBlueRain } from '../../index';
import { ViewProperties } from '@blueeast/bluerain-ui-interfaces';
import ImageBackground from '../ImageBackground';
import React from 'react';

/**
 * BlueRain wallpaper, reads wallpaper configs from configs.wallpaper.
 */
const Wallpaper = (props: ViewProperties & { bluerain: BlueRain }) => {

	const { bluerain: BR, style, ...others } = props;
	const wallpaper = BR.Configs.get('wallpaper');

	const styles = { style, flex: 1 };

	return (
		<ImageBackground style={styles} {...wallpaper} {...others} />
	);
};

export default withBlueRain(Wallpaper);
