// import { ActivityIndicator, Image, Text, View } from '../native';
import {
	BlueBaseHookProps,
	ComponentStateProps,
	DataObserverProps,
	DynamicIconProps,
	ErrorObserverProps,
	JsonSchemaProps,
	LoadingStateProps,
	PluginIconProps,
	StatefulComponentProps,
	SystemAppProps,
	SystemContentProps,
	WaitObserverProps,
} from '../components';
import { ButtonProps as ButtonProperites } from './components/Button';
import { ComponentRegistry } from '../registries';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface ComponentRegistryWithUIInterfaces extends ComponentRegistry {

	// System Components
	BlueBaseHook: React.ComponentType<BlueBaseHookProps>,
	ComponentState: React.ComponentType<ComponentStateProps>,
	DataObserver: React.ComponentType<DataObserverProps>,
	DynamicIcon: React.ComponentType<DynamicIconProps>,
	EmptyState: React.ComponentType,
	ErrorObserver: React.ComponentType<ErrorObserverProps>,
	ErrorState: React.ComponentType,
	JsonSchema: React.ComponentType<JsonSchemaProps>,
	LoadingState: React.ComponentType<LoadingStateProps>,
	Noop: React.ComponentType,
	PluginIcon: React.ComponentType<PluginIconProps>,
	StatefulComponent: React.ComponentType<StatefulComponentProps>,
	SystemApp: React.ComponentType<SystemAppProps>,
	SystemContent: React.ComponentType<SystemContentProps>,
	SystemFooter: React.ComponentType<ViewProperties>,
	SystemHeader: React.ComponentType<ViewProperties>,
	WaitObserver: React.ComponentType<WaitObserverProps>,

	// UI
	// ActivityIndicator: ActivityIndicator,
	Button: React.ComponentType<ButtonProperites>,
	// Image: Image,
	// Text: Text,
	// View: View,
}

