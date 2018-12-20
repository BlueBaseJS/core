export interface ObjectMapperField {
	key?: string;
	transform?: (...params: any[]) => any;
}

export interface Fields {
	[src: string]: string | ObjectMapperField;
}

export interface FieldsInternal {
	[src: string]: ObjectMapperField;
}

function processMapperFields(fields: Fields): FieldsInternal {
	const newFields: FieldsInternal = {};

	Object.keys(fields).forEach((srcKey: string) => {
		const destKey = fields[srcKey];

		newFields[srcKey] = typeof destKey === 'string' ? { key: destKey } : destKey;
	});

	return newFields;
}

/**
 * Example 1:
 *
 * mapObject({ foo: 'bar' })
 */

export function objectMapper(obj: any, fields: Fields) {
	const newObj: any = {};
	const processedFields = processMapperFields(fields);

	Object.keys(processedFields).forEach(destKey => {
		const src = processedFields[destKey];

		let value;

		if (src.key && obj[src.key]) {
			value = obj[src.key];
		}

		if (src.transform) {
			value = src.transform(obj, fields);
		}

		if (value === undefined) {
			return;
		}

		newObj[destKey] = value;
	});

	return newObj;
}

export type foo = Partial<Fields>;
