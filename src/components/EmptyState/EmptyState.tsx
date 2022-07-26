import { ComponentStateProps, EmptyStateProps } from '@bluebase/components';
import React from 'react';

import { useComponent } from '../../hooks';

/**
 * # 📭 EmptyState
 *
 * A generic state used on screens or widgets that are empty or have no data.
 *
 * ## Usage
 * ```jsx
 * <EmptyState/>
 * ```
 */
export const EmptyState = (props: EmptyStateProps) => {
	const ComponentState = useComponent<ComponentStateProps>('ComponentState');
	return (
		<ComponentState
			title="No data"
			description="There is no data to display."
			imageSource="Empty"
			{...props}
		/>
	);
};

EmptyState.displayName = 'EmptyState';
