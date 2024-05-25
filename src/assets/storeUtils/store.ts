import { reactive } from 'vue'
import i18n from '@/locales/i18n'
import { talkHistory } from './talkHistory'
import { selectList } from './selectList'

export const store = reactive({
    language: 'zh',
    theme: 'momotalk',
    fullScreen: false,
    zoom: 1,
    draggable: window.matchMedia('(max-width: 1150px)').matches,
    apikey: '',
    host: 'https://api.openai.com/v1/chat/completions',

    typing: 0,
    text: '',
    insertId: -1,
    showPlayerDialog: false,
    showSettingDialog: false,
    storyKey: '10005',
    storyList: {} as { [key: string]: string[] },
    storyFile: '1000501',

    setData() {
        talkHistory.setData()
        selectList.setData()
        localStorage.setItem('language', JSON.stringify(this.language))
        localStorage.setItem('arona-apikey', JSON.stringify(this.apikey))
        localStorage.setItem('arona-host', JSON.stringify(this.host))
        localStorage.setItem('render-theme', JSON.stringify(this.theme))
        localStorage.setItem('draggable', JSON.stringify(this.draggable))
        localStorage.setItem('full-screen', JSON.stringify(this.fullScreen))
        localStorage.setItem('zoom', JSON.stringify(this.zoom))
    },
    getData() {
        talkHistory.getData()
        selectList.getData()
        const data = ['language', 'arona-apikey', 'arona-host', 'render-theme', 'draggable', 'full-screen', 'zoom']
            .map((x) => localStorage.getItem(x))
        this.language  = data[0] != null ? JSON.parse(data[0]) : 'zh'
        i18n.global.locale = this.language as any
        this.apikey    = data[1] != null ? JSON.parse(data[1]) : ''
        this.host      = data[2] != null ? JSON.parse(data[2]) : 'https://api.openai.com/v1/chat/completions'
        this.theme     = data[3] != null ? JSON.parse(data[3]) : 'momotalk'
        this.draggable = data[4] != null ? JSON.parse(data[4]) : window.matchMedia('(max-width: 1150px)').matches
        this.fullScreen = data[5] != null ? JSON.parse(data[5]) : false
        this.zoom      = data[6] != null ? JSON.parse(data[6]) : 1
    },
    resetData() {
        talkHistory.resetData()
        selectList.resetData()
        this.setData()
    }
})
