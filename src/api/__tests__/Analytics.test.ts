// tslint:disable:object-literal-sort-keys

import { AnalyticTrackData } from '../Analytics';
import { BlueBase } from '../../BlueBase';

describe('Analytics', () => {

	it('should register a Plugin', async () => {
		const BB = new BlueBase();
		const testData: AnalyticTrackData = {
			name: 'click',
			attributes: {
				genre: 'music'
			},
			metrics: {
				foo: 1,
				bar: 2
			},
		};

		await BB.Hooks.register('bluebase.analytics.track', {
			name: 'analytics-test',
			handler: (data: AnalyticTrackData) => {
				expect(data).toMatchObject(testData);
			}
		});

		BB.Analytics.track(testData);
	});

});