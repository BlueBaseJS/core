/**
 * Created by umair on 8/21/17.
 */
import React from 'react';
import BR from '../../src/index';

describe('Config registry tests', () => {
	describe('set Config', () => {
		it('should throw error b/c key is undefined', () => {
			expect(() => BR.Configs.set(undefined, 'value')).toThrow(
        'No config key provided'
      );
		});
		it('should throw error b/c key is null', () => {
			expect(() => BR.Configs.set(null, 'value')).toThrow(
        'No config key provided'
      );
		});

		it('should throw error b/c value is undefined', () => {
			expect(() => BR.Configs.set('key', undefined)).toThrow(
        'No config value provided'
      );
		});
		it('should throw error b/c value is null', () => {
			expect(() => BR.Configs.set('key', null)).toThrow(
        'No config value provided'
      );
		});
		it('should have set value', () => {
			BR.Configs.set('title', 'abc title');
			expect(BR.Configs.get('title')).toEqual('abc title');
		});
	});
	describe('get Config', () => {
		it('should throw error b/c key is undefined', () => {
			expect(() => BR.Configs.get(undefined)).toThrow(
        'No config key provided'
      );
		});
		it('should throw error b/c key is null', () => {
			expect(() => BR.Configs.get(null)).toThrow('No config key provided');
		});

		it('should reutrn value', () => {
			expect(BR.Configs.get('title')).toEqual('abc title');
		});
	});
	describe('register Config', () => {
		it('register config', () => {
			BR.Configs.registerMany({ app: 'hello world'});
			expect(BR.Configs.get('app')).toEqual('hello world');
		});
		it('register config', () => {

			BR.Configs.registerMany({ title: 'changed title'} );
			expect(BR.Configs.get('title')).toEqual('changed title');
		});
	});
});
