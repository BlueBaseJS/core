import React from 'react';
import { View as BaseView, ViewProps } from 'react-native';

export { ViewProps } from 'react-native';

export const View: React.ComponentType<ViewProps> = (props: ViewProps) => <BaseView {...props} />;
View.displayName = 'View';
