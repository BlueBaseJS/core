# Apollo GraphQL Client Plugin

Apollo Client

## Usage
Run the following command in the plugin directoy:

```shell
npm i --save @blueeast/bluerain-plugin-apollo
```

Then in your boot function, pass the plugin like this:

```javascript
import BR from '@blueeast/bluerain-os';
import ApolloPlugin from '@blueeast/bluerain-plugin-apollo';

BR.boot({
	plugins: [ApolloPlugin]
})
```