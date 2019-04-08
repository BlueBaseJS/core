import { ComponentState } from '../../getComponent';
import { ComponentStateProps } from '../ComponentState';
import React from 'react';

export interface EmptyStateProps extends ComponentStateProps {

  /**
   * Used to locate this view in end-to-end tests.
   */
	testID?: string,

}

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