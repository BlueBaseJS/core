import { ActivityIndicator, Image, ImageProps, Text, View } from 'react-native';
import { BlueBase, BlueBaseProgress } from '../../BlueBase';

import React from 'react';
import { WaitObserver } from '../../components';

// tslint:disable-next-line: no-var-requires
const Logo = require('../../../assets/common/logo.png');

export interface BlueBaseAppLoadingProps {
	BB: BlueBase;
	progress: BlueBaseProgress;
	bootCount: number;
	image: ImageProps['source'];
}

export const BlueBaseAppLoading = ({ progress, image }: BlueBaseAppLoadingProps) => (
	<WaitObserver>
		<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
			<Image source={image} style={{ height: 100, width: 100, margin: 16 }} />
			<View
				style={{
					backgroundColor: 'rgba(0,0,0,.03)',
					borderRadius: 8,
					flexDirection: 'row',
					justifyContent: 'center',
					margin: 8,
					padding: 8,
				}}
			>
				<ActivityIndicator />
				<Text style={{ paddingLeft: 8 }}>
					Loading{progress.progress ? `: ${progress.progress}%` : null}
				</Text>
			</View>
		</View>
	</WaitObserver>
);

const defaultProps: Partial<BlueBaseAppLoadingProps> = {
	image: Logo,
};

BlueBaseAppLoading.defaultProps = defaultProps;
BlueBaseAppLoading.displayName = 'BlueBaseAppLoading';
