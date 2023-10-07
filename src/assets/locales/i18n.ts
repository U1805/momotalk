import { createI18n } from 'vue-i18n'
import i18nEn from './i18n-en'
import i18nJp from './i18n-jp'
import i18nTw from './i18n-tw'
import i18nZh from './i18n-zh'

const messages = {
    zh: i18nZh,
    jp: i18nJp,
    en: i18nEn,
    tw: i18nTw
}

const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    messages,
    warnHtmlInMessage: 'off'
})

export default i18n
