import { BlueBase, BlueBaseProgress, BootOptions } from '../../BlueBase';
import {
	BlueBaseAppError,
	BlueBaseAppErrorProps,
	BlueBaseAppLoading,
	BlueBaseAppLoadingProps,
	BlueBaseRoot,
} from '..';
import React, { useEffect, useState } from 'react';

export interface BlueBaseAppProps extends Partial<BootOptions> {
	/** BlueBase Context */
	BB?: BlueBase;

	/** Component rendered when an error occurs */
	ErrorComponent: React.ComponentType<BlueBaseAppErrorProps>;

	/** Component rendered when an error occurs */
	LoadingComponent: React.ComponentType<BlueBaseAppLoadingProps>;

	/**
	 * If this prop is provided, this tree will be rendered instead of BlueBase's own view.
	 */
	children?: React.ReactNode;

	/**
	 * Used to locate this view in end-to-end tests.
	 */
	testID?: string;
}

/**
 * # 🚀 BlueBaseApp
 *
 * The main BlueBase app. This is the top level component in BlueBase. Takes care
 * of initialisation, and renders either children, or app with routing.
 *
 * ## Usage
 * ```jsx
 * <BlueBaseApp BB={BB} />
 * ```
 */
export const BlueBaseApp = (props: BlueBaseAppProps) => {
	const {
		ErrorComponent = BlueBaseAppError,
		LoadingComponent = BlueBaseAppLoading,
		children,
	} = props;

	const [bootCount, setBootCount] = useState(0);
	const [error, setError] = useState();
	const [booting, setBooting] = useState(true);
	const [bootTrigger, setBootTrigger] = useState(true);
	const [BB] = useState(props.BB || new BlueBase());

	BB.reboot = () => {
		setBootTrigger(true);
	};

	useEffect(() => {
		if (bootTrigger) {
			setBootTrigger(false);
		} else {
			return;
		}

		BB.boot({
			...props,
			onProgress: async (progress: BlueBaseProgress) => {
				setError(progress.error);
			},
		})
			.then(() => {
				setBootCount(bootCount + 1);
				setBooting(false);
			})
			.catch(e => {
				setError(e);
				setBooting(false);
			});
	});

	if (booting) {
		return <LoadingComponent BB={BB} />;
	}

	if (error) {
		return <ErrorComponent error={error} BB={BB} />;
	}

	return <BlueBaseRoot BB={BB}>{children}</BlueBaseRoot>;
};

const defaultProps: Partial<BlueBaseAppProps> = {
	ErrorComponent: BlueBaseAppError,
	LoadingComponent: BlueBaseAppLoading,
};

BlueBaseApp.defaultProps = defaultProps;
