import Parser, { JsonComponentSchema } from './Parser';
import { BlueRain } from '../../';
import React from 'react';

export { JsonComponentSchema };
export interface JsonToReact {
	parser: Parser;

	/**
	 * Parses a JSON based schema to React Component tree
	 */
	parse(schema: JsonComponentSchema): React.ReactElement<any> | null;
}

export class JsonToReactClass implements JsonToReact {
	parser: Parser;

	constructor(ctx: BlueRain) {
		this.parser = new Parser(ctx);
	}

	/**
	 * Parses a JSON based schema to React Component tree
	 */
	parse(schema: JsonComponentSchema): React.ReactElement<any> {
		if (!schema) {
			throw new Error(`Schema in BR.API.JsonToReact.parse method cannot be ${schema}.`);
		}

		return this.parser.parseSchema(schema) as React.ReactElement<any>;
	}
}
