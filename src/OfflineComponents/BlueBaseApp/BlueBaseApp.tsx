import React, { useEffect, useState } from 'react';

import { BlueBase, BlueBaseProgress, BootOptions } from '../../BlueBase';
import { ErrorObserver } from '../../components';
import { BlueBaseProvider } from '../../contexts';
import { getComponent } from '../../getComponent';
import { IntlProvider } from '../../intl';
import { ThemeProvider } from '../../themes';
import { BlueBaseAppError, BlueBaseAppErrorProps, BlueBaseAppLoading, BlueBaseAppLoadingProps } from '../';
import { BlueBaseAppTestError } from '../BlueBaseAppTestError';
import { useExceptionHandlingOnProduction } from './useExceptionHandlingOnProduction';

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

	const [BB] = useState(props.BB || new BlueBase());

	const [bootCount, setBootCount] = useState(0);
	const [booting, setBooting] = useState(true);
	const [bootTrigger, setBootTrigger] = useState(true); // Setting to true to start boot
	const [progress, setProgress] = useState<BlueBaseProgress>({});

	const { onError } = useExceptionHandlingOnProduction(BB);

	async function boot(reset?: boolean) {
		if (!booting) {
			setBooting(true);
		}

		await BB.boot({
			...props,
			reset,

			onProgress: (p: BlueBaseProgress) => {
				setProgress(p);
				if (p.error) {
					setBooting(false);
				}
			},
		});
		setBootCount(bootCount + 1);
		setBooting(false);
	}

	BB.reboot = async (reset: boolean = false) => {
		boot(reset);
	};

	useEffect(() => {
		if (bootTrigger) {
			setBootTrigger(false);
		} else {
			return;
		}

		boot();
	}, [bootTrigger]);

	if (booting) {
		return <LoadingComponent BB={BB} progress={progress} bootCount={bootCount} />;
	}

	if (progress.error) {
		return <ErrorComponent BB={BB} progress={progress} bootCount={bootCount} />;
	}

	return (
		<BlueBaseProvider key={`boot-${bootCount}`} value={BB}>
			<ErrorObserver
				errorComponent={ErrorComponent}
				BB={BB}
				progress={progress}
				bootCount={bootCount}
				onError={onError}
			>
				<ThemeProvider>
					<IntlProvider>
						<BlueBaseContent>{children}</BlueBaseContent>
					</IntlProvider>
				</ThemeProvider>
			</ErrorObserver>
		</BlueBaseProvider>
	);
};

const defaultProps: Partial<BlueBaseAppProps> = {
	ErrorComponent: process.env.NODE_ENV === 'test' ? BlueBaseAppTestError : BlueBaseAppError,
	LoadingComponent: BlueBaseAppLoading,
};

BlueBaseApp.defaultProps = defaultProps;
BlueBaseApp.displayName = 'BlueBaseApp';
