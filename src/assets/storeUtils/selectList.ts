import { reactive } from 'vue'
import { myStudent } from '../utils/interface'

export const selectList = reactive({
    selectList: [] as myStudent[],

    getStudentIndexById(id: number) {
        return this.selectList.findIndex((item: myStudent) => item.Id === id)
    },

    deleteStudent(id: number) {
        const index: number = this.getStudentIndexById(id)
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
        localStorage.setItem('selectHistory', JSON.stringify(this.selectList))
    },
    getData() {
        const data = localStorage.getItem('selectHistory')
        this.selectList = data != null ? JSON.parse(data) : ([] as myStudent[])
    },
    resetData() {
        this.selectList = [] as myStudent[]
        this.setData()
    }
})
