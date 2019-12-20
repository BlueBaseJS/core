import { Text, View } from 'react-native';

import { BlueBaseApp } from '../../../';
import { DataObserver } from '../DataObserver';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('DataObserver', () => {
	test(`should generate states from custom listener functions`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DataObserver data="foo" isEmpty={() => false} isLoading={() => true}>
					{({ data, empty, loading }: { data: string; empty: boolean; loading: boolean }) => {
						return (
							<View testID="data-view">
								<Text testID="data">{data}</Text>
								<Text testID="empty">{String(empty)}</Text>
								<Text testID="loading">{String(loading)}</Text>
							</View>
						);
					}}
				</DataObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DataObserver);

		expect(
			wrapper
				.find('[testID="data"]')
				.last()
				.text()
		).toBe('foo');
		expect(
			wrapper
				.find('[testID="empty"]')
				.last()
				.text()
		).toBe('false');
		expect(
			wrapper
				.find('[testID="loading"]')
				.last()
				.text()
		).toBe('true');
	});

	test(`should set loading to true`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DataObserver data="foo" loading={true}>
					{({ data, empty, loading }: { data: string; empty: boolean; loading: boolean }) => {
						return (
							<View testID="data-view">
								<Text testID="data">{data}</Text>
								<Text testID="empty">{String(empty)}</Text>
								<Text testID="loading">{String(loading)}</Text>
							</View>
						);
					}}
				</DataObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DataObserver);

		expect(
			wrapper
				.find('[testID="data"]')
				.last()
				.text()
		).toBe('foo');
		expect(
			wrapper
				.find('[testID="empty"]')
				.last()
				.text()
		).toBe('false');
		expect(
			wrapper
				.find('[testID="loading"]')
				.last()
				.text()
		).toBe('true');
	});

	test(`should set empty to true if data if an empty array`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DataObserver data={[]} loading={true}>
					{({ data, empty, loading }: { data: string; empty: boolean; loading: boolean }) => {
						return (
							<View testID="data-view">
								<Text testID="data">{data}</Text>
								<Text testID="empty">{String(empty)}</Text>
								<Text testID="loading">{String(loading)}</Text>
							</View>
						);
					}}
				</DataObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DataObserver);

		expect(
			wrapper
				.find('[testID="data"]')
				.last()
				.text()
		).toBe('');
		expect(
			wrapper
				.find('[testID="empty"]')
				.last()
				.text()
		).toBe('true');
		expect(
			wrapper
				.find('[testID="loading"]')
				.last()
				.text()
		).toBe('true');
	});

	test(`should set empty to false if data if an array`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DataObserver data={['a']} loading={true}>
					{({ data, empty, loading }: { data: string; empty: boolean; loading: boolean }) => {
						return (
							<View testID="data-view">
								<Text testID="data">{(data as any).join()}</Text>
								<Text testID="empty">{String(empty)}</Text>
								<Text testID="loading">{String(loading)}</Text>
							</View>
						);
					}}
				</DataObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DataObserver);

		expect(
			wrapper
				.find('[testID="data"]')
				.last()
				.text()
		).toBe('a');
		expect(
			wrapper
				.find('[testID="empty"]')
				.last()
				.text()
		).toBe('false');
		expect(
			wrapper
				.find('[testID="loading"]')
				.last()
				.text()
		).toBe('true');
	});

	test(`should set empty and loading to false when there are no listener functions`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DataObserver data="a" isEmpty={null as any} isLoading={null as any}>
					{({ data, empty, loading }: { data: string; empty: boolean; loading: boolean }) => {
						return (
							<View testID="data-view">
								<Text testID="data">{data}</Text>
								<Text testID="empty">{String(empty)}</Text>
								<Text testID="loading">{String(loading)}</Text>
							</View>
						);
					}}
				</DataObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DataObserver);

		expect(
			wrapper
				.find('[testID="data"]')
				.last()
				.text()
		).toBe('a');
		expect(
			wrapper
				.find('[testID="empty"]')
				.last()
				.text()
		).toBe('false');
		expect(
			wrapper
				.find('[testID="loading"]')
				.last()
				.text()
		).toBe('false');
	});

	test(`should set loading to false, if loading prop is not a boolean`, async () => {
		const wrapper = mount(
			<BlueBaseApp>
				<DataObserver data="a" loading={'true' as any}>
					{({ data, empty, loading }: { data: string; empty: boolean; loading: boolean }) => {
						return (
							<View testID="data-view">
								<Text testID="data">{data}</Text>
								<Text testID="empty">{String(empty)}</Text>
								<Text testID="loading">{String(loading)}</Text>
							</View>
						);
					}}
				</DataObserver>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DataObserver);

		expect(
			wrapper
				.find('[testID="data"]')
				.last()
				.text()
		).toBe('a');
		expect(
			wrapper
				.find('[testID="empty"]')
				.last()
				.text()
		).toBe('false');
		expect(
			wrapper
				.find('[testID="loading"]')
				.last()
				.text()
		).toBe('false');
	});
});
