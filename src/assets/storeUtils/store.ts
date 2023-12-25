import { reactive } from 'vue'
import i18n from '@/locales/i18n'
import { talkHistory } from './talkHistory'
import { selectList } from './selectList'

export const store = reactive({
    language: 'zh',

    typing: 0,
    text: '',
    showDialog: false,
    storyKey: '10005',
    storyList: {} as {[key:string]: string[]},
    storyFile: '1000501',

    setData() {
        talkHistory.setData()
        selectList.setData()
        localStorage.setItem('language', JSON.stringify(this.language))
    },
    getData() {
        talkHistory.getData()
        selectList.getData()
        const data = localStorage.getItem('language')
        this.language = data != null ? JSON.parse(data) : ('zh' as string)
        i18n.global.locale = this.language as any
    },
    resetData() {
        talkHistory.resetData()
        selectList.resetData()
        this.language = 'zh'
        this.setData()
    }
})
