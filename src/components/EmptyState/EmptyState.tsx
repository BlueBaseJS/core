import { ComponentState } from '../../index';
import React from 'react';

export interface EmptyStateProps {}

export const EmptyState = (_props: EmptyStateProps) =>
	(<ComponentState title="Empty area" description="No data found." />);
