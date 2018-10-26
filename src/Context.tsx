import { createContext } from 'react';
import { BlueBase } from './BlueBase';

export const BlueBaseContext: React.Context<BlueBase> = createContext(undefined as any);
export const BlueBaseProvider = BlueBaseContext.Provider;
export const BlueBaseConsumer = BlueBaseContext.Consumer;
