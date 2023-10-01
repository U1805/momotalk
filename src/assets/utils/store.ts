import { reactive } from 'vue'
import { myStudent, Talk } from './interface'

const historyState = {
    state: [] as Talk[][],
    top: 0 as number,
    cur: -1 as number,
    max_size: 20 as number,

    push(ele:Talk[]) {
        if(this.state.length >= this.max_size){
            this.state.splice(0, 1)
            this.cur--
        }
        this.state[++this.cur] = JSON.parse(JSON.stringify(ele))
        this.top = this.cur + 1
    },
    undo() {
        if(this.cur>0) this.cur -= 1
        return this.state[this.cur] 
    },
    redo() {
        if(this.cur<this.top-1) this.cur += 1
        return this.state[this.cur]
    }
}

export const store = reactive({
    selectList: [] as myStudent[],
    talkHistory: [] as Talk[],
    talkId: 0,
    language: 'zh',

    // momotalk player mode var
    showDialog: false,
    storyFile: "Shiroko01",
    storyLng: "MessageTW",

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
            if (index === 0 || !this.isSameChar(index + 1, index - 1))
                this.setTalkFlag(index + 1, 2)

        this.talkHistory.splice(index, 1)
        this.setData()
    },
    pushTalk(talk: Talk) {
        // 插入一条聊天记录
        const len = this.talkHistory.length
        const lastTalk = this.talkHistory[len - 1]

        if (len === 0 || !this.isSameChar_(talk, lastTalk)) this.talkHistory.push(talk)
        else if (talk.flag === 2) {
            talk.flag = 0
            this.talkHistory.push(talk)
        } else {
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
        if (talk0.type !== talk1.type) return false
        return talk0.name === talk1.name
    },
    isSameChar(i: number, j: number) {
        const talk0: Talk = store.talkHistory[i]
        const talk1: Talk = store.talkHistory[j]
        return this.isSameChar_(talk0, talk1)
    },

    setData() {
        historyState.push(this.talkHistory)
        localStorage.setItem('talkHistory', JSON.stringify(this.talkHistory))
        localStorage.setItem('selectHistory', JSON.stringify(this.selectList))
        localStorage.setItem('talkId', JSON.stringify(this.talkId))
        localStorage.setItem('language', JSON.stringify(this.language))
    },
    getData() {
        const data = [
            localStorage.getItem('talkHistory'),
            localStorage.getItem('selectHistory'),
            localStorage.getItem('talkId'),
            localStorage.getItem('language'),
        ]
        this.talkHistory = data[0] != null ? JSON.parse(data[0]) : ([] as Talk[])
        this.selectList = data[1] != null ? JSON.parse(data[1]) : ([] as myStudent[])
        this.talkId = data[2] != null ? JSON.parse(data[2]) : (0 as number)
        this.language = data[3] != null ? JSON.parse(data[3]) : ('zh' as string)
        historyState.push(this.talkHistory)
    },
    resetData() {
        this.talkHistory = [] as Talk[]
        this.selectList = [] as myStudent[]
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
