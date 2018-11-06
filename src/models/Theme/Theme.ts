import { Palette } from './Palette';
import { ThemeTypography } from './Typography';
import kebabCase from 'lodash.kebabcase';

export interface ThemeInput extends Pick<Theme, Exclude<keyof Theme, 'slug'>> {
	slug?: string;
}

export class Theme {

	/** Theme name */
	public name!: string;

	/** Theme slug, used as an ID. Must be unique */
	slug!: string;

	/** Type of theme. A theme can be either light or dark */
	type: 'light' | 'dark' = 'light';

	shape!: {
		borderRadius: number,
		[key: string]: any,
	};
	spacing!: {
		unit: number,
		[key: string]: any,
	};
	typography!: ThemeTypography;
	palette!: Palette;

	[key: string]: any,

	constructor(options?: ThemeInput) {

		// TODO: write some tests for different scenarios
		Object.assign(this, options || {});

		// this.setup();
	}

	/**
	 * It is mandatory to call this method after creating a new plugin instance.
	 * This is because we want to support values through extended class properties,
	 * but unfortunately, they're not accessible in constructor.
	 *
	 * This is feels dirty, ugly and bad. But we couldn't find a cleaner way around it.
	 *
	 * More info:
	 * - [Github](https://github.com/Microsoft/TypeScript/issues/1617)
	 */
	public setup() {

		if (!this.name) {
			throw Error('Could not create Plugin. Reason: name property is required.');
		}

		this.slug = kebabCase(this.slug ? this.slug : this.name);

		return this;
	}
}
