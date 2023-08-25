import './assets/css/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/assets/locales/i18n'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
