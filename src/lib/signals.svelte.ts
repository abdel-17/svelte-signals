export type GetSet<T> = readonly [get: () => T, set: (value: T) => void];

/**
 * Creates deeply reactive state.
 *
 * @example
 * ```ts
 * const [items, setItems] = createState<string[]>([]);
 *
 * function addItem(item: string) {
 *     items().push(item)
 * };
 *
 * function clearItems() {
 *     setItems([]);
 * }
 * ```
 *
 * @param initial The initial value
 */
export function createState<T>(): GetSet<T | undefined>;

/**
 * Creates deeply reactive state.
 *
 * @example
 * ```ts
 * const [items, setItems] = createState<string[]>([]);
 *
 * function addItem(item: string) {
 *     items().push(item)
 * };
 *
 * function clearItems() {
 *     setItems([]);
 * }
 * ```
 *
 * @param initial The initial value
 */
export function createState<T>(initial: T): GetSet<T>;

export function createState<T>(initial?: T): GetSet<T | undefined> {
	let current = $state(initial);
	return [
		() => current,
		(value) => {
			current = value;
		},
	];
}

/**
 * Creates state that is _not_ made deeply reactive — instead of mutating it,
 * you must set it.
 *
 * @example
 * ```ts
 * const [items, setItems] = createRawState<string[]>([]);
 *
 * function addItem(item: string) {
 *     setItems([...items(), item]);
 * };
 * ```
 *
 * @param initial The initial value
 */
export function createRawState<T>(): GetSet<T | undefined>;

/**
 * Creates state that is _not_ made deeply reactive — instead of mutating it,
 * you must set it.
 *
 * @example
 * ```ts
 * const [items, setItems] = createRawState<string[]>([]);
 *
 * function addItem(item: string) {
 *     setItems([...items(), item]);
 * };
 * ```
 *
 * @param initial The initial value
 */
export function createRawState<T>(initial: T): GetSet<T>;

export function createRawState<T>(initial?: T): GetSet<T | undefined> {
	let current = $state.raw(initial);
	return [
		() => current,
		(value) => {
			current = value;
		},
	];
}

/**
 * Creates derived state, i.e. one that depends on other state variables.
 * The given function should be free of side-effects.
 *
 * @example
 * ```ts
 * const [count, setCount] = createState(0);
 * const double = createDerived(() => count() * 2);
 * ```
 */
export function createDerived<T>(fn: () => T): () => T {
	const current = $derived.by(fn);
	return () => current;
}
