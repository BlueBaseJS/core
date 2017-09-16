/* @flow */
// import { ClientOptions as SubscriptionClientOptions } from 'subscriptions-transport-ws';
// import type { NetworkInterfaceOptions } from 'react-apollo';

// export type ApolloOptions = {
// 	subscriptions: boolean,
// 	wsUri: string,
// 	subscriptionClient: SubscriptionClientOptions,
// 	networkInterface: NetworkInterfaceOptions,
// 	client: {}
// };


/**
 * This is the default configuration set
 * that is used at boot time.
 *
 * @namespace
 * @property {boolean}	subscriptions [default: false]				Activate subscriptions
 * @property {string}	wsUri																		URI of websocket server
 * @property {SubscriptionClientOptions}	subscriptionClient	SubscriptionClient params, if subscriptions are activated
 * @property {NetworkInterfaceOptions}	networkInterface			NetworkInterface params
 * @property {ApolloClientOptions}	client										Apollo client params
 */
const defaultConfigs = {
	subscriptions: false,
	wsUri: undefined,
	subscriptionClient: {},
	networkInterface: {},
	client: {}
};

export default defaultConfigs;
