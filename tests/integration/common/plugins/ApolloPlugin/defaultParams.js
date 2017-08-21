export default {

	/**
	 * Activate subscriptions
	 */
	subscriptions: false,

	/**
	 * URI of websocket server
	 */
	wsUri: undefined,

	/**
	 * SubscriptionClient params, if subscriptions are activated
	 */
	subscriptionClient: {
		reconnect: true
	},

	/**
	 * NetworkInterface params
	 */
	networkInterface: {},

	/**
	 * Apollo client params
	 */
	client: {}
};
