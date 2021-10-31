import { NoopProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';

const Noop = getComponent<NoopProps>('Noop');

storiesOf('Noop', module).add('With default props', () => <Noop />);
