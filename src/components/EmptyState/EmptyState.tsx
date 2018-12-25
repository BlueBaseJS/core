import { ComponentState, ComponentStateProps } from '../../index';
import React from 'react';

export interface EmptyStateProps extends ComponentStateProps {}

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
export const EmptyState = (props: EmptyStateProps) =>
	(<ComponentState title="Empty Area" description="Create new items to fill this area." {...props} />);

EmptyState.displayName = 'EmptyState';