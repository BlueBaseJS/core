// tslint:disable:object-literal-sort-keys

import { AnalyticsTrackData } from '../Analytics';
import { BlueBase } from '../../BlueBase';

describe('Analytics', () => {
	it('should send track data through hook', async () => {
		const BB = new BlueBase();
		const testData: AnalyticsTrackData = {
			name: 'click',
			attributes: {
				genre: 'music',
			},
			metrics: {
				foo: 1,
				bar: 2,
			},
		};

		await BB.Filters.register({
			key: 'analytics-test',
			event: 'bluebase.analytics.track',
			value: (data: AnalyticsTrackData) => {
				expect(data).toMatchObject(testData);
			},
		});

		BB.Analytics.track(testData);
	});
});
