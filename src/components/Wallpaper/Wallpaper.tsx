import { BlueRain, withBlueRain } from '../../index';
import { ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

/**
 * BlueRain wallpaper, reads wallpaper configs from configs.wallpaper.
 */
const Wallpaper = (props: { bluerain: BlueRain; style?: ViewStyle }) => {
	const { bluerain: BR, style = {}, ...others } = props;
	const wallpaper = BR.Configs.get('wallpaper');

	const styles = { ...style, flex: 1 };

	return (
		<BR.Components.ImageBackground style={styles} {...wallpaper} {...others} />
	);
};

export default withBlueRain(Wallpaper);
