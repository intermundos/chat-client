import './assets/styles/tailwind.scss'
import { createApp } from 'vue'
import { addSocket } from '@/@core/plugins/plugins.js'
import App           from './App.vue'
import { store }     from './@core/store/store'

const app = createApp(App)

addSocket(app)

app.config.devtools = true
app.use(store)
app.mount('#app')
