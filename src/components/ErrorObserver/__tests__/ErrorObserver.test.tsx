import { BlueBaseApp } from '../../BlueBaseApp';
import { ErrorObserver } from '../ErrorObserver';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';

beforeEach(() => {
	jest.resetModules();
});

const Bang = () => {
	throw Error('💥 Boom!');
};

const BangNull = () => {
	throw null;
};

describe('ErrorObserver', () => {

	test(`Snapshot ErrorObserver`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver>
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children.join()).toBe('Hello');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ErrorObserver after complete rendering`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver>
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children.join()).toBe('Hello');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ErrorObserver after complete rendering with error`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver
					error={{ name: '404', message: 'no page found' }}
					errorComponent={() => <Text>Error</Text>}
				>
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children.join()).toBe('Error');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`Snapshot ErrorObserver after complete rendering with child as function`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver>
				{
					() => <Text>Hello</Text>
				}
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children.join()).toBe('Hello');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should catch an error when thrown by a child component`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver>
					<Bang />
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children[0].children.join()).toBe('Error');
			expect((tree as any).children[0].children[1].children.join()).toBe('💥 Boom!');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should catch an error when thrown null by a child component`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver>
					<BangNull />
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children[0].children.join()).toBe('Error');
			expect((tree as any).children[0].children[1].children.join()).toBe('An unknown error occured.');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should not catch an error because check error is null`, (done) => {
		const rendered = TestRenderer.create(
			<BlueBaseApp>
				<ErrorObserver checkError={null as any} error={Error('Useless')} >
					<Text>Hello</Text>
				</ErrorObserver>
			</BlueBaseApp>
		);

		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children[0].children.join()).toBe('Hello');
			expect(tree).toMatchSnapshot();
			done();
		});
	});


});
