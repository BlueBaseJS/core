import { Dimensions } from 'react-native';

import { getScreenSizeFromWidth, isMobile } from '../Screen';

describe('Utils', () => {
	describe('Screen', () => {
		describe('.getScreenSizeFromWidth method', () => {
			it('should return xs when width is 500', () => {
				expect(getScreenSizeFromWidth(500)).toBe('xs');
			});

			it('should return sm when width is 700', () => {
				expect(getScreenSizeFromWidth(700)).toBe('sm');
			});

			it('should return xs when width is 500', () => {
				expect(getScreenSizeFromWidth(500)).toBe('xs');
			});

			it('should return md when width is 900', () => {
				expect(getScreenSizeFromWidth(900)).toBe('md');
			});

			it('should return lg when width is 1100', () => {
				expect(getScreenSizeFromWidth(1100)).toBe('lg');
			});

			it('should return xl when width is 1300', () => {
				expect(getScreenSizeFromWidth(1300)).toBe('xl');
			});
		});

		describe('.isMobile method', () => {
			it('should return true when width is 300', () => {
				(Dimensions as any).get = () => ({
					width: 300,
				});

				expect(isMobile()).toBe(true);
			});

			it('should return true when width is 700', () => {
				(Dimensions as any).get = () => ({
					width: 700,
				});

				expect(isMobile()).toBe(true);
			});

			it('should return false when width is 900', () => {
				(Dimensions as any).get = () => ({
					width: 900,
				});

				expect(isMobile()).toBe(false);
			});
		});
	});
});
