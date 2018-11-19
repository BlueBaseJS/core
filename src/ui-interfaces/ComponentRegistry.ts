// import { ActivityIndicator, Image, Text, View } from '../native';
import {
	BlueBaseHookProps,
	ComponentStateProps,
	DynamicIconProps,
	JsonSchemaProps,
	LoadingStateProps,
	PluginIconProps,
	SystemAppProps,
	SystemContentProps,
	WaitObserverProps,
} from '../components';
import { ButtonProps as ButtonProperites } from './components/Button';
import { ComponentRegistry } from '../registries';
import React from 'react';

export interface ComponentRegistryWithUIInterfaces extends ComponentRegistry {

	// System Components
	BlueBaseHook: React.ComponentType<BlueBaseHookProps>,
	ComponentState: React.ComponentType<ComponentStateProps>,
	DynamicIcon: React.ComponentType<DynamicIconProps>,
	EmptyState: React.ComponentType,
	ErrorState: React.ComponentType,
	JsonSchema: React.ComponentType<JsonSchemaProps>,
	LoadingState: React.ComponentType<LoadingStateProps>,
	Noop: React.ComponentType,
	PluginIcon: React.ComponentType<PluginIconProps>,
	SystemApp: React.ComponentType<SystemAppProps>,
	SystemContent: React.ComponentType<SystemContentProps>,
	WaitObserver: React.ComponentType<WaitObserverProps>,

	// UI
	// ActivityIndicator: ActivityIndicator,
	Button: React.ComponentType<ButtonProperites>,
	// Image: Image,
	// Text: Text,
	// View: View,
}

