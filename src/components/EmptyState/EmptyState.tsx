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
			title="Empty Area"
			description="Create new items to fill this area."
			{...props}
		/>
	);
};

EmptyState.displayName = 'EmptyState';
