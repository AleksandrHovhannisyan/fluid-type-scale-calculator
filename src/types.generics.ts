/** Given a discriminated union of types `T`, returns the constituent that has `K` keys mapping to `V` values.
 *
 * Docs: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
 *
 * Credit: https://stackoverflow.com/questions/50125893/typescript-derive-map-from-discriminated-union/50125960#50125960
 */
export type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;

/** Given a type `T` of the shape `{ [K]: string }`, where `K` is a key of `T`, returns a mapped type
 * mapping each value under that key to the corresponding discriminated type/constituent from `T`.
 * This is mainly useful when `T` is a discriminated union type.
 *
 * Docs: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
 *
 * Credit: https://stackoverflow.com/questions/50125893/typescript-derive-map-from-discriminated-union/50125960#50125960
 */
export type MapDiscriminatedUnion<T extends Record<K, string>, K extends keyof T> = {
  [V in T[K]]: DiscriminateUnion<T, K, V>;
};

/** Given an ID, extracts the constituent from a discriminated union type `T` that has a property of `id` matching `N`.
 * Credit: https://stackoverflow.com/a/50499316/5323344 */
export type NarrowById<T, N> = T extends { id: N } ? T : never;
