import { Text, View } from 'react-native';

import { BlueBase } from '@bluebase/core';
import React from 'react';

export interface BlueBaseAppLoadingProps {
	BB: BlueBase;
}

export const BlueBaseAppLoading = (_props: BlueBaseAppLoadingProps) => (
	<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
		<Text>Loading</Text>
	</View>
);
