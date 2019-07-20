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

import { BlueBaseApp } from '../../';
import { BlueBaseLightTheme } from '../../themes';
import React from 'react';
import TestRenderer from 'react-test-renderer';

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

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
					expect(tree).toMatchSnapshot();

					expect((tree as any).type).toBe('Text');
					expect((tree as any).props.style[0]).toMatchObject(theme.typography.overline);
					done();
				});
			});
		});
	});
});
