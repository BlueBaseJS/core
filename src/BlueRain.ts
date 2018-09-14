import { ComponentRegistry, HookRegistry, PluginRegistry } from './registries';
import { Logger } from './api';

export class BlueRain {

	// APIs
	public Logger = new Logger(this);

	// Registries
	public Components: ComponentRegistry = new ComponentRegistry(this);
	public Hooks: HookRegistry = new HookRegistry(this);
	public Plugins: PluginRegistry = new PluginRegistry(this);
}