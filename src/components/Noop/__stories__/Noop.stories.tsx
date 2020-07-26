import { NoopProps } from '@bluebase/components';
import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const Noop = getComponent<NoopProps>('Noop');

storiesOf('Noop', module).add('With default props', () => <Noop />);
