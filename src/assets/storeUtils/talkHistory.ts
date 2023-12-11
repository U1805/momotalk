import { reactive } from 'vue'
import { Talk } from '../utils/interface'
import { historyState } from './historyState'

const isSameChar_ = (talk0: Talk, talk1: Talk) => {
    if (talk0.type !== talk1.type) return false
    return talk0.name === talk1.name
}

export const talkHistory = reactive({
    talkHistory: [] as Talk[],
    talkId: 0,

    isSameChar(i: number, j: number) {
        const talk0: Talk = this.talkHistory[i]
        const talk1: Talk = this.talkHistory[j]
        return isSameChar_(talk0, talk1)
    },
    checkMove(i: number, j: number) {
        const len = this.talkHistory.length
        if (this.talkHistory[i].type <= 1) {
            if (i > 0 && this.isSameChar(i - 1, i)) this.setTalkFlag(i, 0)
            else this.setTalkFlag(i, 2)
        }
        if (i < len - 1 && this.talkHistory[i + 1].type <= 1) {
            if (this.isSameChar(i, i + 1)) this.setTalkFlag(i + 1, 0)
            else this.setTalkFlag(i + 1, 2)
        }
        if (this.talkHistory[j].type <= 1) {
            if (j > 0 && this.isSameChar(j - 1, j)) this.setTalkFlag(j, 0)
            else this.setTalkFlag(j, 2)
        }
        if (j < len - 1 && this.talkHistory[j + 1].type <= 1) {
            if (this.isSameChar(j, j + 1)) this.setTalkFlag(j + 1, 0)
            else this.setTalkFlag(j + 1, 2)
        }
        this.setData()
    },

    getTalkIndexById(id: number) {
        return this.talkHistory.findIndex((item: Talk) => item.id === id)
    },
    getTalkById(id: number) {
        return this.talkHistory[this.getTalkIndexById(id)]
    },
    deleteTalkByIndex(index: number) {
        const len = this.talkHistory.length
        if (index >= 0 && index < len - 1 && this.talkHistory[index + 1].type <= 1)
            if (index === 0 || !this.isSameChar(index + 1, index - 1))
                this.setTalkFlag(index + 1, 2)

        this.talkHistory.splice(index, 1)
        this.setData()
    },
    deleteTalkById(id: number) {
        const index: number = this.getTalkIndexById(id)
        this.deleteTalkByIndex(index)
    },
    pushTalk(talk: Talk) {
        const len = this.talkHistory.length
        const lastTalk = this.talkHistory[len - 1]

        if (len === 0 || !isSameChar_(talk, lastTalk)) this.talkHistory.push(talk)
        else if (talk.flag === 2) {
            talk.flag = 0
            this.talkHistory.push(talk)
        } else {
            this.talkHistory.push(talk)
        }

        this.setData()
    },
    setTalkContent(id: number, content: string) {
        const index: number = this.getTalkIndexById(id)
        this.talkHistory[index].content = content
        this.setData()
    },
    setTalkName(id: number, name: string) {
        const index: number = this.getTalkIndexById(id)
        this.talkHistory[index].name = name
        this.setData()
    },
    setTalkFlag(index: number, flag: number) {
        this.talkHistory[index].flag = flag
        this.setData()
    },

    setData() {
        localStorage.setItem('talkHistory', JSON.stringify(this.talkHistory))
        localStorage.setItem('talkId', JSON.stringify(this.talkId))
        if (JSON.stringify(this.talkHistory) !== JSON.stringify(historyState.value()))
            historyState.push(this.talkHistory)
    },
    getData() {
        const data = [localStorage.getItem('talkHistory'), localStorage.getItem('talkId')]
        this.talkHistory = data[0] != null ? JSON.parse(data[0]) : ([] as Talk[])
        this.talkId = data[1] != null ? JSON.parse(data[1]) : 0
        historyState.push(this.talkHistory)
    },
    resetData() {
        this.talkHistory = [] as Talk[]
        this.talkId = 0 as number
        this.setData()
    },
    undo() {
        this.talkHistory = historyState.undo()
    },
    redo() {
        this.talkHistory = historyState.redo()
    }
})
