export type EsModule<T> = {
	__esModule: boolean;
	default: T;
};

export type MaybeEsModule<T> = T | EsModule<T>;

export function getModule<T = any>(object: MaybeEsModule<T>): T {

	return (object as EsModule<T>).default
		? ((object as EsModule<T>).default as T)
		: object as T;
}

export function isEsModule<T>(a: any): a is EsModule<T> {
	return a.default !== undefined;
}