import { createI18n } from 'vue-i18n'
import i18nEn from './i18n-en'
import i18nJp from './i18n-jp'
import i18nTw from './i18n-tw'
import i18nZh from './i18n-zh'
import i18nKr from './i18n-kr'

const messages = {
    zh: i18nZh,
    jp: i18nJp,
    en: i18nEn,
    tw: i18nTw,
    kr: i18nKr
}

const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'en',
    messages,
    warnHtmlInMessage: 'off'
})

export default i18n
