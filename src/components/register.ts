import { BlueRain } from '../BlueRain';
import { SystemApp } from './SystemApp';

export async function register(BR: BlueRain) {

	await BR.Components.register('SystemApp', SystemApp);
}