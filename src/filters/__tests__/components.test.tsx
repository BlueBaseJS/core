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
import { BlueBaseTheme } from '../../themes';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createPlugin } from '../../registries';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const theme = BlueBaseTheme;

describe('filters', () => {
	describe('components', () => {
		describe('bluebase.components.register.internal', () => {
			test(`should register H1 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<H1>Sample Text</H1>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, H1);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.h1);
			});

			test(`should register H2 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<H2>Sample Text</H2>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, H2);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.h2);
			});

			test(`should register H3 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<H3>Sample Text</H3>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, H3);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.h3);
			});

			test(`should register H4 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<H4>Sample Text</H4>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, H4);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.h4);
			});

			test(`should register H5 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<H5>Sample Text</H5>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, H5);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.h5);
			});

			test(`should register H6 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<H6>Sample Text</H6>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, H6);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.h6);
			});

			test(`should register Subtitle1 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<Subtitle1>Sample Text</Subtitle1>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, Subtitle1);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.subtitle1);
			});

			test(`should register Subtitle2 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<Subtitle2>Sample Text</Subtitle2>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, Subtitle2);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.subtitle2);
			});

			test(`should register Body1 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<Body1>Sample Text</Body1>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, Body1);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.body1);
			});

			test(`should register Body2 component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<Body2>Sample Text</Body2>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, Body2);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.body2);
			});

			test(`should register Caption component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<Caption>Sample Text</Caption>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, Caption);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.caption);
			});

			test(`should register Overline component with proper styles`, async () => {
				const wrapper = mount(
					<BlueBaseApp>
						<Overline>Sample Text</Overline>
					</BlueBaseApp>
				);

				await waitForElement(wrapper, Overline);

				expect(
					StyleSheet.flatten(wrapper
						.find('Text')
						.last()
						.prop('style') as any)
				).toMatchObject(theme.typography.overline);
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
