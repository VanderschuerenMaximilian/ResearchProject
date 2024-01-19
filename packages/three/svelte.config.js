import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import houdini from 'houdini-svelte/preprocess'
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [houdini(), vitePreprocess()],

  kit: {
    adapter: adapter(),
    alias: {
      $houdini: path.resolve('.', '$houdini'),
    },
  },
}

export default config;
