import {
	Body1,
	Body2,
	Caption,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Overline,
	Subtitle1,
	Subtitle2,
} from '../../getComponent';

import { BlueBase } from '../../BlueBase';
import { BlueBaseApp } from '../../';
import { BlueBaseLightTheme } from '../../themes';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { createPlugin } from '../../registries';

const theme = BlueBaseLightTheme.value as any;

describe('filters', () => {
	describe('components', () => {
		describe('bluebase.components.register.internal', () => {
			test(`should register H1 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<H1>Sample Text</H1>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.h1);
					done();
				});
			});

			test(`should register H2 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<H2>Sample Text</H2>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.h2);
					done();
				});
			});

			test(`should register H3 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<H3>Sample Text</H3>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.h3);
					done();
				});
			});

			test(`should register H4 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<H4>Sample Text</H4>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.h4);
					done();
				});
			});

			test(`should register H5 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<H5>Sample Text</H5>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.h5);
					done();
				});
			});

			test(`should register H6 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<H6>Sample Text</H6>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.h6);
					done();
				});
			});

			test(`should register Subtitle1 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<Subtitle1>Sample Text</Subtitle1>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.subtitle1);
					done();
				});
			});

			test(`should register Subtitle2 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<Subtitle2>Sample Text</Subtitle2>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.subtitle2);
					done();
				});
			});

			test(`should register Body1 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<Body1>Sample Text</Body1>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.body1);
					done();
				});
			});

			test(`should register Body2 component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<Body2>Sample Text</Body2>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.body2);
					done();
				});
			});

			test(`should register Caption component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<Caption>Sample Text</Caption>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.caption);
					done();
				});
			});

			test(`should register Overline component with proper styles`, done => {
				const rendered = TestRenderer.create(
					<BlueBaseApp>
						<Overline>Sample Text</Overline>
					</BlueBaseApp>
				);

				setTimeout(() => {
					const tree = rendered.toJSON();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.overline);
					done();
				});
			});
		});

		describe('input source', () => {
			it('should set "system" input source for built-in components', async () => {
				const BB = new BlueBase();
				await BB.boot();

				const source = BB.Components.getMeta('H1', 'source');

				expect(source.type).toBe('system');
			});

			it('should set "boot" input source for components added via boot', async () => {
				const BB = new BlueBase();
				await BB.boot({
					components: {
						Foo: () => null,
					},
				});

				const source = BB.Components.getMeta('Foo', 'source');

				expect(source.type).toBe('boot');
			});

			it('should set "plugin" input source for components added via plugin', async () => {
				const BB = new BlueBase();
				await BB.boot({
					plugins: [
						createPlugin({
							key: 'bar',

							components: {
								Foo: () => null,
							},
						}),
					],
				});

				const source = BB.Components.getMeta('Foo', 'source');

				expect(source.type).toBe('plugin');
				expect(source.key).toBe('bar');
			});
		});
	});
});
