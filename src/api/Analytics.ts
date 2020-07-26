import { BlueBase } from '../BlueBase';

export interface AnalyticsTrackData {
	[key: string]: any;

	/** Event name */
	name: string;

	/**
	 * The attributes of the event. Some analytics platfomrs use these attributes
	 * as selection criteria when you create a segment.
	 */
	attributes?: { [key: string]: string };

	/** Custom metrics that your app reports to analytics providers (i.e. AWS Pinpoint) */
	metrics?: { [key: string]: number };
}

/**
 * 📈 Analytics API
 */
export class Analytics {
	constructor(private BB: BlueBase) {
		//
	}

	public track(data: AnalyticsTrackData) {
		this.BB.Filters.run('bluebase.analytics.track', data);
	}
}
