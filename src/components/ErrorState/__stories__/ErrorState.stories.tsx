import { ErrorStateProps } from '@bluebase/components';
import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const ErrorState = getComponent<ErrorStateProps>('ErrorState');

storiesOf('ErrorState', module).add('With default props', () => <ErrorState />);
