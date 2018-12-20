import { BlueBase } from './BlueBase';
import { createContext } from 'react';

export const BlueBaseContext: React.Context<BlueBase> = createContext(undefined as any);
export const BlueBaseProvider = BlueBaseContext.Provider;
export const BlueBaseConsumer = BlueBaseContext.Consumer;
