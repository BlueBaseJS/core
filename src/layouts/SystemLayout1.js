import { parseJsonSchema } from '../utils/JsonSchemaToReact';
// import { runCallbacks } from '../Callbacks';

export default function SystemLayout() {
	const schema = {
		component: 'div',
		props: {
			className: 'system-layout'
		},
		children: [{
			component: 'h2',
			text: 'Hello World!',
		}]
	};

	return parseJsonSchema(schema);
}
