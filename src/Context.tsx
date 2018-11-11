import React, { createContext } from 'react';
import { BlueBase } from './BlueBase';

export const BlueBaseContext: React.Context<BlueBase> = createContext(undefined as any);
export const BlueBaseProvider = BlueBaseContext.Provider;
export const BlueBaseConsumer = BlueBaseContext.Consumer;

// HOC

export interface BlueBaseAwareProps {
	BB: BlueBase
}

export function withBlueBase<P extends BlueBaseAwareProps>(Component: React.ComponentType<P>) {
	function BlueBasedComponent(props: Pick<P, Exclude<keyof P, keyof BlueBaseAwareProps>>) {
		return (
      <BlueBaseConsumer>
        {(context) => <Component {...props} BB={context} />}
      </BlueBaseConsumer>
		);
	}

	return BlueBasedComponent;
}