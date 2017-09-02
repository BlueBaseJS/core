---
title: JSON schema to React
---


## Parse JSON To React

This function accepts json and return a React componet of schema.The valid schemas are:


```
const schema = {
    component: 'h1',
    props:{
        className:'heading'
    },
    text: 'Hello World'
}
```

```
const schema = {
    component: 'h1',
    props:{
        className:'heading'
    },
    chidren: [
        {
            component: 'p',
            props:{
                className: 'paragraph'
            },
            text:'Paragraph in haeding'
        }
    ]
}
```
> Note: We can either pass text or children to a component. If passed both return react component will only have text. 

To use function:
```
import BR from '@blueeast/bluerain-os';

BR.parseJsonSchema(schema);

```

## JSON for React Components

We can also create already defined react componets by using JSON. The format for using them is that first we have to register them in Component Registry. JSONTOReact can create React elements for HTML elements and registered react elements.

```
import BR from '@blueeast/bluerain-os';

const Logo = props => {
  return (
    <div>/* component code */</div>
  )
} 
BR.Components.register('BluerainLogo', Logo);

const schema = {
    component: 'BluerainLogo',
    props:{
        src:'imageLink',
        color: 'blue'
    }
}
BR.parseJsonSchema(schema);

```
The above code will return react element containing `BluerainLogo` component.
