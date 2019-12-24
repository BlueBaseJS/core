import { BlueBase, BlueBaseProgress, BootOptions } from '../../BlueBase';
import {
	BlueBaseAppError,
	BlueBaseAppErrorProps,
	BlueBaseAppLoading,
	BlueBaseAppLoadingProps,
} from '..';
import React, { useEffect, useState } from 'react';

import { BlueBaseProvider } from '../../Context';
import { ErrorObserver } from '../../components';
import { IntlProvider } from '../../intl';
import { ThemeProvider } from '../../themes';
import { getComponent } from '../../getComponent';
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
		boot();
	}, []);

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
	ErrorComponent: BlueBaseAppError,
	LoadingComponent: BlueBaseAppLoading,
};

BlueBaseApp.defaultProps = defaultProps;
BlueBaseApp.displayName = 'BlueBaseApp';
