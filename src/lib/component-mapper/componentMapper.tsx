import { Fields, objectMapper } from './objectMapper';
import React from 'react';

/**
 * A React HOC to map components
 *
 * Example 1:
 *
 * Material UI Button: <MUI.Button label="ABC" />
 * BlueBase BUtton: <BB.Components.Button>{label}</BB.Components.Button>
 *
 * So BB.Components.Button = componentMapper(MUI.Button, { label: children });
 *
 * @param Component
 * @param fields
 */
export function componentMapper<Props = any>
	(Component: React.ComponentType<any>, fields: Fields): React.ComponentType<Props> {

	return (props: any) => {
		const newProps: Props = objectMapper(props, fields);
		return <Component {...newProps} />;
	};
}