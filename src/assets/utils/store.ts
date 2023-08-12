import { reactive } from 'vue'
import { myStudent, Talk } from './interface'

export const store = reactive({
    selectList: [] as myStudent[],
    talkHistory: [] as Talk[],
    talkId: 0,

    // talkHistory 操作
    getTalksById(id: number): number {
        const index: number = this.talkHistory.findIndex((item: Talk) => item.id === id)
        return index
    },
    getTalkById(id: number, talks: Talk) {
        const index: number = talks.talks.findIndex((item: { id: number; content: string }) => item.id === id)
        return index
    },
    deleteTalksById(id: number) {
        // 删除一段聊天记录
        const index: number = this.getTalksById(id)
        this.talkHistory.splice(index, 1)
        this.setData()
    },
    deleteTalkById(id: number) {
        // 删除一条聊天记录
        for (const talks of this.talkHistory) {
            const index = this.getTalkById(id, talks)
            if (index != -1) {
                talks.talks.splice(index, 1)
            }
        }
        this.setData()
    },
    pushTalk(talk: Talk) {
        // 插入一条聊天记录

        // 先清理之前的空记录
        for (const talks of this.talkHistory) {
            if (talks.talks.length === 0) this.deleteTalksById(talks.id)
        }

        const len = this.talkHistory.length
        if (len === 0)
            // 聊天记录为空
            this.talkHistory.push(talk)
        else if (
            talk.name === this.talkHistory[len - 1].name &&
            talk.avatar === this.talkHistory[len - 1].avatar
        )
            // 和上一条同一说话人
            this.talkHistory[len - 1].talks.push(talk.talks[0])
        // 不同说话人
        else this.talkHistory.push(talk)

        this.setData()
    },

    // selectList 操作
    deleteStudent(index: number) {
        this.selectList.splice(index, 1)
        this.setData()
    },
    pushStudent(student: myStudent) {
        for (const item of this.selectList) {
            if (item.Id === student.Id) return
        }

        this.selectList.push(student)

        this.setData()
    },

    setData() {
        localStorage.setItem('talkHistory', JSON.stringify(this.talkHistory))
        localStorage.setItem('selectHistory', JSON.stringify(this.selectList))
        localStorage.setItem('talkId', JSON.stringify(this.talkId))
    },
    getData() {
        const data = [
            localStorage.getItem('talkHistory'),
            localStorage.getItem('selectHistory'),
            localStorage.getItem('talkId')
        ]
        this.talkHistory = data[0] != null ? JSON.parse(data[0]) : ([] as Talk[])
        this.selectList = data[1] != null ? JSON.parse(data[1]) : ([] as myStudent[])
        this.talkId = data[2] != null ? JSON.parse(data[2]) : (0 as number)
    },
    resetData() {
        this.talkHistory = [] as Talk[]
        this.selectList = [] as myStudent[]
        this.talkId = 0 as number
        this.setData()
    }
})
