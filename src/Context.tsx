import { createContext } from 'react';
import { BlueRain } from './BlueRain';

export const BlueRainContext: React.Context<BlueRain> = createContext(undefined as any);
export const BlueRainProvider = BlueRainContext.Provider;
export const BlueRainConsumer = BlueRainContext.Consumer;
