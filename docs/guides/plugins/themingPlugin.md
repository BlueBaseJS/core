# Theming Plugin

First install the plugin as a npm package to your project:

```
npm i --save bluerain-plugin-theming
```

Then import your plugins in your plugins.js file

```js
import themingPlugin from '@blueeast/bluerain-plugin-theming';

module.exports = [themingPlugin];
```

At last, boot your client with the plugin:

```js
import BR from '@blueeast/blurain-os';

const plugins = require('./plugins');

BR.boot({ plugins });
```
This plugin adds theming reducer so styles of specific page can be changed by dispatching an action. To change styles `setTheme` action can be dispatched. 
The component which is to use this plugin should be wrapped in `withTheme` HOC which is also provided by theming plugin. The example can be as follows:
```javascript
import ThemingPlugin from '@blueeast/bluerain-plugin-theming';

class Foo extends React.Component {
    changeTheme(theme) {
        this.props.setTheme(theme)
    }
    render() {
        return(
            <div>bar</div>
        )
    }
}
export default ThemingPlugin.withTheme(Foo);

```