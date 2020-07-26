import { EmptyStateProps } from '@bluebase/components';
import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const EmptyState = getComponent<EmptyStateProps>('EmptyState');

storiesOf('EmptyState', module).add('With default props', () => <EmptyState />);
