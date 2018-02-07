export type EsModule<T> = {
	__esModule: boolean;
	default: T;
};

export type MaybeEsModule<T> = T | EsModule<T>;
