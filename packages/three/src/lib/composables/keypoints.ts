import type { Keypoint } from '@tensorflow-models/posenet'
import { writable, type Writable } from 'svelte/store'
export const poseKeypoints = writable() as Writable<Keypoint[]>