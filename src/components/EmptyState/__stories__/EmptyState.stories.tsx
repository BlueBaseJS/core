import { EmptyStateProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';

const EmptyState = getComponent<EmptyStateProps>('EmptyState');

storiesOf('EmptyState', module).add('With default props', () => <EmptyState />);
