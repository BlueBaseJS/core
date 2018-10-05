import { Button } from '@material-ui/core';
import { componentMapper } from '../componentMapper';

describe('Component Mapper test specifications', () => {
    it('', () => {
        const Component = componentMapper(Button, {fullWidth: 'width'});
        console.log('component', Component);
    });
});