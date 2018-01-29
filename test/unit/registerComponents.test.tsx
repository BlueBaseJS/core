import React from 'react';
import Components from '../../src/registerComponents';
import BR,{Plugin} from '../../src/index';

class Reactxp  extends Plugin {
    static pluginName = Reactxp;
    static slug = 'reactxp';
    static  initialize(config:{}, ctx:any) {
        const Main=(App:any)=>{
            ctx.Utils.setMainView(<App/>);
        };
    }
}

it('should render Components', () => {

          BR.boot({platform:[Reactxp],renderApp:false});

expect(BR.Components.has('ComponentState')).toBe(true);
expect(BR.Components.has('ImageBackground')).toBe(true);
expect(BR.Components.has('Page')).toBe(true);
expect(BR.Components.has('Wallpaper')).toBe(true);
expect(BR.Components.has('SystemLayout')).toBe(true);
expect(BR.Components.has('IndexPage')).toBe(true);
expect(BR.Components.has('NotFoundPage')).toBe(true);
expect(BR.Components.has('BlueRainApp')).toBe(true);
});