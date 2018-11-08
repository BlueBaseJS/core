import { ButtonProps as ButtonProperites } from './components/Button';
import { ComponentRegistry } from '../registries';
import React from 'react';

export interface ComponentRegistryWithUIInterfaces extends ComponentRegistry {
	Button: React.ComponentType<ButtonProperites>
}

