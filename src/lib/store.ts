import { writable, type Writable } from 'svelte/store';
import type { Dispatcher, Reducer } from './types';

/** Given an initial state and a reducer function, returns a reactive store and a dispatcher function to update the store. */
export function reducible<State extends object, Action extends object>(
	initialState: State,
	reducer: Reducer<State, Action>
): {
	/** A reducible and reactive store/state. */
	store: Writable<State>;
	/** A function that, when called, updates the store. */
	dispatch: Dispatcher<Action>;
} {
	const store = writable<State>(initialState);

	function dispatch(action: Action) {
		store.update((state) => reducer(state, action));
	};

	return { store, dispatch };
}
