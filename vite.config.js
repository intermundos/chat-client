import vue from '@vitejs/plugin-vue'

const path = require('path')

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [ vue() ],
  server:  {
    port: 5555,
    open: false
  },
  alias:   [
    { find: '@', replacement: path.resolve(__dirname, 'src') }
  ]
}
