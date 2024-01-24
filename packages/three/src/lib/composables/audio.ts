import { writable } from 'svelte/store'
export const play = writable<boolean>(false);
export const volume = writable<number>(0);
export const muted = writable<boolean>(false);
