import React from 'react';
import {
	ActivityIndicator,
	Image,
	ImageProps,
	Text,
	View
} from 'react-native';

import { BlueBase, BlueBaseProgress } from '../../BlueBase';
import { WaitObserver } from '../../components';

const Logo = require('../../../assets/logo.png');

export interface BlueBaseAppLoadingProps {
	BB: BlueBase;
	progress: BlueBaseProgress;
	bootCount: number;
	image?: ImageProps['source'];
}

export const BlueBaseAppLoading: React.FC<BlueBaseAppLoadingProps> = ({
	progress,
	image = Logo,
}) => (
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
					Loading{progress.progress ? `: ${progress.progress}%` : ''}
				</Text>
			</View>
		</View>
	</WaitObserver>
);

BlueBaseAppLoading.displayName = 'BlueBaseAppLoading';
