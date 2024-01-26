import { writable } from 'svelte/store'
export const buttonIdle = writable<boolean>(false)
export const buttonWalk = writable<boolean>(false)
export const buttonRun = writable<boolean>(false)

export const startButton = writable<boolean>(false)
export const techniqueButton = writable<boolean>(false)