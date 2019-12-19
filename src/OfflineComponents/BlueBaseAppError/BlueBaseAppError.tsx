import { BlueBase, BlueBaseProgress } from '../../BlueBase';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import React from 'react';
import { isProduction } from '../../utils';

const MISSING_ERROR = 'An unknown error occured.';

export interface BlueBaseAppErrorProps {
	BB: BlueBase;
	error?: Error;
	progress?: BlueBaseProgress;
	bootCount: number;
}

export const BlueBaseAppError = ({ progress = {}, error: err, BB }: BlueBaseAppErrorProps) => {
	const error = err || progress.error;
	let development = BB.Configs.getValue('development');

	if (development === undefined) {
		development = !isProduction();
	}

	const message = development === true ? error.message : MISSING_ERROR;

	return (
		<ScrollView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
					<Text style={{ fontWeight: 'bold' }}>🚨 Error</Text>
					<Text>{message}</Text>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

BlueBaseAppError.displayName = 'BlueBaseAppError';
