import { reactive } from 'vue'
import { myStudent, Talk } from './interface'

export const store = reactive({
    selectList: [] as myStudent[],
    talkHistory: [] as Talk[],
    talkId: 0,

    getIndexById(id: number) {
        return this.talkHistory.findIndex((item: Talk) => item.id === id)
    },
    getTalkById(id: number) {
        return this.talkHistory[this.getIndexById(id)]
    },

    // talkHistory 操作
    deleteTalkById(id: number) {
        // 删除一条聊天记录
        const index: number = this.getIndexById(id)

        const len = this.talkHistory.length
        if (index < len - 1 && this.talkHistory[index + 1].type <= 1)
            if (index == 0 || !this.isSameChar(index + 1, index - 1))
                this.setTalkFlag(index + 1, 2)

        this.talkHistory.splice(index, 1)
        this.setData()
    },
    pushTalk(talk: Talk) {
        // 插入一条聊天记录
        const len = this.talkHistory.length
        const lastTalk = this.talkHistory[len - 1]

        if (len === 0 || !this.isSameChar_(talk, lastTalk)) this.talkHistory.push(talk)
        else if (talk.flag == 2){
            talk.flag = 0
            this.talkHistory.push(talk)
        }else{
            this.talkHistory.push(talk)
        }

        this.setData()
    },
    setTalkContent(id: number, content: string) {
        // 修改一条记录内容
        const index: number = this.getIndexById(id)
        this.talkHistory[index].content = content
        this.setData()
    },
    setTalkName(id: number, name: string) {
        // 修改一条记录内容
        const index: number = this.getIndexById(id)
        this.talkHistory[index].name = name
        this.setData()
    },
    setTalkFlag(index: number, flag: number) {
        this.talkHistory[index].flag = flag
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

    // 辅助操作
    isSameChar_(talk0: Talk, talk1: Talk) {
        if (talk0.type != talk1.type) return false
        return talk0.name == talk1.name
    },
    isSameChar(i: number, j: number) {
        const talk0: Talk = store.talkHistory[i]
        const talk1: Talk = store.talkHistory[j]
        return this.isSameChar_(talk0, talk1)
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
