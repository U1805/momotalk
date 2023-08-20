import { reactive } from 'vue'
import { myStudent, Talk } from './interface'

export const store = reactive({
    selectList: [] as myStudent[],
    talkHistory: [] as Talk[],
    talkId: 0,

    // talkHistory 操作
    deleteTalkById(id: number) {
        // 删除一条聊天记录
        const index: number = this.talkHistory.findIndex((item: Talk) => item.id === id)

        const len = this.talkHistory.length
        if (index < len - 1 && this.talkHistory[index + 1].type <= 1)
            if (index == 0 || !this.isSameChar(index + 1, index - 1))
                (this.talkHistory[index + 1].content as any).flag = 2

        this.talkHistory.splice(index, 1)
        this.setData()
    },
    pushTalk(talk: Talk) {
        // 插入一条聊天记录
        const len = this.talkHistory.length

        if (len === 0 || talk.type > 1) this.talkHistory.push(talk)
        else {
            const lastTalk = this.talkHistory[len - 1]
            if ((talk.content as any).name === (lastTalk.content as any).name) {
                ;(talk.content as any).flag = 0
                this.talkHistory.push(talk)
            } else this.talkHistory.push(talk)
        }

        this.setData()
    },
    setTalkContent(id: number, content:string){
        // 修改一条记录内容
        const index: number = this.talkHistory.findIndex((item: Talk) => item.id === id)
        if(this.talkHistory[index].type <= 1){
            (this.talkHistory[index].content as any).text = content
        }
        else{
            this.talkHistory[index].content = content
        }

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
    isSameChar(i: number, j: number) {
        const talk0: Talk = store.talkHistory[i]
        const talk1: Talk = store.talkHistory[j]
        if (talk0.type != talk1.type) return false
        else if (talk0.type === 0) {
            if ((talk0.content as any).name != (talk1.content as any).name) return false
            else return true
        } else return true
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
