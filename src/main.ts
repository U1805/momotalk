import './assets/css/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/locales/i18n'
import VMdPreview from '@/markdown/markdown'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

app.use(VueLazyLoad, {})
app.use(router)
app.use(i18n)
app.use(VMdPreview)
app.mount('#app')
