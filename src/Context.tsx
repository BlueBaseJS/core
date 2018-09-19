import { BR } from './instance';
import { createContext } from 'react';

export const BlueRainContext = createContext(BR);
export const BlueRainProvider = BlueRainContext.Provider;
export const BlueRainConsumer = BlueRainContext.Consumer;
