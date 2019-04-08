import { ComponentState } from '../../getComponent';
import { EmptyStateProps } from '@bluebase/components';
import React from 'react';

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