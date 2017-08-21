import { parseJsonSchema } from '../utils/JsonSchemaToReact';

export default function SystemLayout() {
	const schema = {
		component: 'View',

		children: [{
			component: 'Text',
			text: 'BlueRain OS!',
		}]
	};

	return parseJsonSchema(schema);
}
