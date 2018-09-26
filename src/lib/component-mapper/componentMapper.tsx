import React from 'react';
import { Fields, objectMapper } from './objectMapper';

/**
 * A React HOC to map components
 *
 * Example 1:
 *
 * Material UI Button: <MUI.Button label="ABC" />
 * BlueRain BUtton: <BR.Components.Button>{label}</BR.Components.Button>
 *
 * So BR.Components.Button = componentMapper(MUI.Button, { label: children });
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