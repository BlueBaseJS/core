/**
 * Omit certains keys from an object type.
 *
 * ## Example:
 *
 * ```typescript
 * interface Test {
 *  a: string;
 *  b: number;
 *  c: boolean;
 * }
 * ```
 *
 * Omit a single property:
 * ```typescript
 * type OmitA = Omit<Test, "a">; // Equivalent to: {b: number, c: boolean}
 * ```
 *
 * Or, to omit multiple properties:
 * ```typescript
 * type OmitAB = Omit<Test, "a"|"b">; // Equivalent to: {c: boolean}
 * ```
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
