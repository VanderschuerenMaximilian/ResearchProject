import { writable } from 'svelte/store'
export const buttonIdle = writable<boolean>(false)
export const buttonWalk = writable<boolean>(false)
export const buttonRun = writable<boolean>(false)
export const buttonStance = writable<boolean>(false)
export const buttonGedanBarai = writable<boolean>(false)
export const buttonOiTsuki = writable<boolean>(false)
export const buttonTetsui = writable<boolean>(false)
export const buttonAgeUke = writable<boolean>(false)
export const buttonShutoUke = writable<boolean>(false)

export const startButton = writable<boolean>(false)