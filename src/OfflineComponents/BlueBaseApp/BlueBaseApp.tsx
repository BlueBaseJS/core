import { BlueBase, BlueBaseProgress, BootOptions } from '../../BlueBase';
import {
	BlueBaseAppError,
	BlueBaseAppErrorProps,
	BlueBaseAppLoading,
	BlueBaseAppLoadingProps,
} from '..';
import React, { useEffect, useState } from 'react';

import { BlueBaseProvider } from '../../Context';
import { IntlProvider } from '../../intl';
import { ThemeProvider } from '../../themes';
import { getComponent } from '../../getComponent';

const BlueBaseContent = getComponent('BlueBaseContent');

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
	const [booting, setBooting] = useState(true);
	const [bootTrigger, setBootTrigger] = useState(true); // Setting to true to start boot
	const [progress, setProgress] = useState<BlueBaseProgress>({});

	const [BB] = useState(props.BB || new BlueBase());

	BB.reboot = async () => {
		setBootTrigger(true);
	};

	useEffect(() => {
		if (bootTrigger) {
			setBootTrigger(false);
		} else {
			return;
		}

		(async () => {
			await BB.boot({
				...props,
				onProgress: (p: BlueBaseProgress) => {
					setProgress(p);
					if (p.error) {
						setBooting(false);
					}
				},
			});
			setBootCount(bootCount + 1);
			setBooting(false);
		})();
	}, [bootTrigger]);

	if (booting) {
		return <LoadingComponent BB={BB} progress={progress} bootCount={bootCount} />;
	}

	if (progress.error) {
		return <ErrorComponent BB={BB} progress={progress} bootCount={bootCount} />;
	}

	return (
		<BlueBaseProvider key={`boot-${bootCount}`} value={BB}>
			<ThemeProvider>
				<IntlProvider>
					<BlueBaseContent>{children}</BlueBaseContent>
				</IntlProvider>
			</ThemeProvider>
		</BlueBaseProvider>
	);
};

const defaultProps: Partial<BlueBaseAppProps> = {
	ErrorComponent: BlueBaseAppError,
	LoadingComponent: BlueBaseAppLoading,
};

BlueBaseApp.defaultProps = defaultProps;
