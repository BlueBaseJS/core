import { BlueBase, BlueBaseProgress } from '../../BlueBase';

export interface BlueBaseAppTestErrorProps {
	BB: BlueBase;
	error?: Error;
	progress?: BlueBaseProgress;
	bootCount: number;
}

export const BlueBaseAppTestError = ({ progress, error: err }: BlueBaseAppTestErrorProps) => {
	const error = err || (progress && progress.error);

	if (error) {
		throw error;
	}

	return null;
};

BlueBaseAppTestError.displayName = 'BlueBaseAppTestError';
