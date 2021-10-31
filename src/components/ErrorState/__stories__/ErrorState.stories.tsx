import { ErrorStateProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';

const ErrorState = getComponent<ErrorStateProps>('ErrorState');

storiesOf('ErrorState', module).add('With default props', () => <ErrorState />);
