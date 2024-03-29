import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import { BlueBase, BlueBaseProgress } from '../../BlueBase';
import { WaitObserver } from '../../components';

const MISSING_ERROR = 'An unknown error occurred.';

export interface BlueBaseAppErrorProps {
	BB: BlueBase;
	error?: Error;
	progress?: BlueBaseProgress;
	bootCount: number;
	retry?: () => void;
}

export const BlueBaseAppError = ({ progress, error: err, retry }: BlueBaseAppErrorProps) => {
	const error = err || (progress && progress.error);
	let development = process.env.NODE_ENV !== 'production';

	if (development === undefined) {
		development = false;
	}

	const message = development === true && error ? error.message : MISSING_ERROR;

	return (
		<WaitObserver delay={100}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<SafeAreaView
					style={{ alignItems: 'center', flexGrow: 1, justifyContent: 'center', padding: 16 }}
				>
					<View
						style={{
							borderColor: 'rgb(244, 67, 54)',
							borderRadius: 8,
							borderWidth: 1,
							minWidth: 200,
						}}
					>
						<Text
							style={{
								backgroundColor: 'rgba(244, 67, 54, .1)',
								borderBottomWidth: 1,
								borderColor: 'rgb(244, 67, 54)',
								borderTopLeftRadius: 4,
								borderTopRightRadius: 4,
								color: 'rgba(244, 67, 54, 1)',
								fontWeight: 'bold',
								padding: 8,
								textAlign: 'center',
							}}
							testID="error-title"
						>
							ERROR
						</Text>
						<Text style={{ padding: 16 }} testID="error-message">
							{message}
						</Text>
						<View style={{}}>
							<TouchableOpacity onPress={retry} testID="error-button">
								<Text
									style={{
										backgroundColor: 'rgba(76, 175, 80, .1)',
										borderColor: 'rgb(76, 175, 80)',
										borderRadius: 4,
										borderWidth: 1,
										color: 'rgb(76, 175, 80)',
										fontWeight: 'bold',
										margin: 8,
										padding: 8,
										textAlign: 'center',
									}}
								>
									RELOAD
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</ScrollView>
		</WaitObserver>
	);
};

BlueBaseAppError.displayName = 'BlueBaseAppError';
