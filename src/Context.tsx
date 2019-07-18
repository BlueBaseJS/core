import { BlueBase } from './BlueBase';
import { createContext } from 'react';

export const BlueBaseContext: React.Context<BlueBase> = createContext(undefined as any);
export const BlueBaseProvider: React.ProviderExoticComponent<React.ProviderProps<BlueBase>> =
	BlueBaseContext.Provider;
export const BlueBaseConsumer: React.ExoticComponent<React.ConsumerProps<BlueBase>> =
	BlueBaseContext.Consumer;
