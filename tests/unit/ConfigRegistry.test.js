/**
 * Created by umair on 8/21/17.
 */
import React from 'react';
import ConfigRegistry from '../../src/registries/ConfigRegistry';

describe('Config registry tests', () => {
	describe('set Config', () => {
		it('should throw error b/c key is undefined', () => {
			expect(() => ConfigRegistry.set(undefined, 'value')).toThrow(
        'No config key provided'
      );
		});
		it('should throw error b/c key is null', () => {
			expect(() => ConfigRegistry.set(null, 'value')).toThrow(
        'No config key provided'
      );
		});

		it('should throw error b/c value is undefined', () => {
			expect(() => ConfigRegistry.set('key', undefined)).toThrow(
        'No config value provided'
      );
		});
		it('should throw error b/c value is null', () => {
			expect(() => ConfigRegistry.set('key', null)).toThrow(
        'No config value provided'
      );
		});
		it('should have set value', () => {
			ConfigRegistry.set('title', 'abc title');
			expect(ConfigRegistry.get('title')).toEqual('abc title');
		});
	});
	describe('get Config', () => {
		it('should throw error b/c key is undefined', () => {
			expect(() => ConfigRegistry.get(undefined)).toThrow(
        'No config key provided'
      );
		});
		it('should throw error b/c key is null', () => {
			expect(() => ConfigRegistry.get(null)).toThrow('No config key provided');
		});

		it('should reutrn value', () => {
			expect(ConfigRegistry.get('title')).toEqual('abc title');
		});
	});
	describe('register Config', () => {
		it('register config', () => {
			ConfigRegistry.register({ app: 'hello world' });
			expect(ConfigRegistry.get('app')).toEqual('hello world');
		});
		it('register config', () => {
			ConfigRegistry.register({ title: 'changed title' });
			expect(ConfigRegistry.get('title')).toEqual('changed title');
		});
	});
});
