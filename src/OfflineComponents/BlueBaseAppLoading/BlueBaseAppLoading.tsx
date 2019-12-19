import { BlueBase, BlueBaseProgress } from '../../BlueBase';
import { Text, View } from 'react-native';

import React from 'react';

export interface BlueBaseAppLoadingProps {
	BB: BlueBase;
	progress: BlueBaseProgress;
	bootCount: number;
}

export const BlueBaseAppLoading = ({ progress }: BlueBaseAppLoadingProps) => (
	<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
		<Text>Loading{progress.progress ? `: ${progress.progress}%` : null}</Text>
	</View>
);

BlueBaseAppLoading.displayName = 'BlueBaseAppLoading';
