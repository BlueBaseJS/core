import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { BlueBase } from '../../../BlueBase';

beforeEach(() => {
	jest.resetModules();
});

const Bang = () => {
	throw Error('💥 Boom!');
};

const BangNull = () => {
	throw null;
};

describe('BlueBaseApp', () => {

	test(`should render BlueBaseApp`, (done: any) => {
		const rendered: any = TestRenderer.create(<BlueBaseApp />);

		// Will show loading
		expect(rendered.toJSON().children.join()).toBe('Loading');
		expect(rendered).toMatchSnapshot();

		// After loading
		setTimeout(() => {
			expect(rendered).toMatchSnapshot();
			done();
		});
	});

	test(`should render default app when boot doesn't return anything`, (done: any) => {

		const BB = new BlueBase();
		BB.Configs.setValue('development', true);
		BB.boot = (() => { Promise.resolve(null); }) as any;

		const rendered: any = TestRenderer.create(
			<BlueBaseApp BB={BB} />
		);

		// After loading
		setTimeout(() => {
			const tree = rendered.toJSON();
			expect(tree).toBe(null);
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render error state when boot throws an error`, (done: any) => {

		const BB = new BlueBase();
		BB.Configs.setValue('development', true);
		BB.boot = () => { throw Error('Boot Error!'); };

		const rendered: any = TestRenderer.create(
			<BlueBaseApp BB={BB} />
		);

		// After loading
		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children.join()).toBe('Boot Error!');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render error state when a child throws an error`, (done: any) => {
		const rendered: any = TestRenderer.create(<BlueBaseApp><Bang /></BlueBaseApp>);

		// After loading
		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children.join()).toBe('💥 Boom!');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render error state with custom message when a child throws a null error`, (done: any) => {
		const rendered: any = TestRenderer.create(<BlueBaseApp><BangNull /></BlueBaseApp>);

		// After loading
		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children.join()).toBe('An unknown error occured.');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render error state with custom message when in production mode`, (done: any) => {

		const rendered: any = TestRenderer.create(
			<BlueBaseApp configs={{ development: false }}>
				<Bang />
			</BlueBaseApp>
		);

		// After loading
		setTimeout(() => {
			const tree = rendered.toJSON();
			expect((tree as any).children.join()).toBe('An unknown error occured.');
			expect(tree).toMatchSnapshot();
			done();
		});
	});
});
