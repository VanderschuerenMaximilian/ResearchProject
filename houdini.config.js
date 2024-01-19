/** @type {import('houdini').ConfigFile} */
const config = {
  plugins: {
    'houdini-svelte': {},
  },
  watchSchema: {
    url: 'http://[::1]:4000/graphql',
  },
  scalars: {
    DateTime: {
      type: 'Date',
      unmarshal(val) {
        return val ? new Date(val) : null
      },
      marshal(date) {
        return date && date.getTime()
      },
    },
  },
}

export default config
