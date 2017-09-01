# Responsive Layouts

In BlueRain it is very easy to modify layouts based on the screen size. 

Unlike the traditional CSS methods, which only modify the styles of the UI based on the screen size, BlueRain gives the abilitity to render completely different layouts for different screen size. This means dedicated UI layouts can be developed for diffent screen sizes or platorm, give the user a natural experience.

This is done by the `ResponsiveLayout` component. It accepts the following props:

prop | Required | Description
----- | ----- | -----
`default` | Yes | If a layout is not provided for a certain window size, `default` layout is used. This is the reason, `default` layout is a required property.
`xs` | No | The layout render on extra small screen size.
`sm` | No | The layout render on small screen size.
`md` | No | The layout render on medium screen size.
`lg` | No | The layout render on large screen size.
`xl` | No | The layout render on extra laarge screen size.

### Usage
```javascript
const DefaultLayout = () => (<View><Text>Default Layout</Text></View>);
const XlLayout = () => (<View><Text>Extra Large Layout</Text></View>);
const LgLayout = () => (<View><Text>Large Layout</Text></View>);
const MdLayout = () => (<View><Text>Medium Layout</Text></View>);
const SmLayout = () => (<View><Text>Small Layout</Text></View>);
const XsLayout = () => (<View><Text>Extra Small Layout</Text></View>);

// Rendering as a component
<ResponsiveLayout
	default={ DefaultLayout }
	xl={ XlLayout }
	lg={ LgLayout }
	md={ MdLayout }
	sm={ SmLayout }
	xs={ XsLayout }
/>

// As JSON Schema
const layout = {
	component: 'ResponsiveLayout',
	props: {
		default: DefaultLayout,
		xs: XlLayout,
		sm: LgLayout,
		md: MdLayout,
		lg: SmLayout,
		xl: XlLayout,
	}
};

const Component = parseJsonSchema(layout);
```

### Window Size Categorization Criteria
Following width ranges are used to determine the screen size:

Window Width | Size
----- | -----
< 576 | `xs`
\>= 576 and < 768 | `sm`
\>= 768 and < 992 | `md`
\>= 992 and < 1200 | `lg`
\>=1200 | `xl`


### `withWindowInfo` hoc

Window size information is stored in the redux store. `width`, `height` and `size` (`xl|lg|md|sm|xs`) are stored in `bluerain.window` property in redux store. Whenever a window size is persisted in the redux store, UI is rendered again. 

To create this functionality, a `WindowInfo` plugin is created. This plugin persists the current window (or screen in case of native) size of the app to the redux store. 

Thsis plugin also exposes a `withSystemInfo` higher order component.

The `withWindowInfo` hoc wraps a component and passes the `window` object and `setWindowDimentions` method as props.

- The `window` object has `width`, `height` and `size` properties.
- The `setWindowDimentions` accepts `width` and `height` as params, and updated the state of the redux store.

```javascript
import  { PluginRegistry } from '@blueeast/bluerain-os';
const withWindowInfo = PluginRegistry.get('window-info').withWindowInfo;
```
