import { reactive } from 'vue'
import i18n from '@/locales/i18n'
import { talkHistory } from './talkHistory'
import { selectList } from './selectList'

export const store = reactive({
    language: 'zh',
    theme: 'momotalk',
    apikey: '',
    host: 'https://api.openai.com/v1/chat/completions',

    typing: 0,
    text: '',
    insertId: -1,
    showPlayerDialog: false,
    showSettingDialog: false,
    storyKey: '10005',
    storyList: {} as {[key:string]: string[]},
    storyFile: '1000501',

    setData() {
        talkHistory.setData()
        selectList.setData()
        localStorage.setItem('language', JSON.stringify(this.language))
        localStorage.setItem('arona-apikey', JSON.stringify(this.apikey))
        localStorage.setItem('arona-host', JSON.stringify(this.host))
        localStorage.setItem('render-theme', JSON.stringify(this.theme))
    },
    getData() {
        talkHistory.getData()
        selectList.getData()
        var data = localStorage.getItem('language')
        this.language = data != null ? JSON.parse(data) : 'zh'
        i18n.global.locale = this.language as any
        data = localStorage.getItem('arona-apikey')
        this.apikey = data != null ? JSON.parse(data) : ''
        data = localStorage.getItem('arona-host')
        this.host = data != null ? JSON.parse(data) : 'https://api.openai.com/v1/chat/completions'
        data = localStorage.getItem('render-theme')
        this.theme = data != null ? JSON.parse(data) : 'momotalk'
    },
    resetData() {
        talkHistory.resetData()
        selectList.resetData()
        this.setData()
    }
})
