import { reactive } from 'vue'
import { baseStudent } from '../utils/interface'

export const selectList = reactive({
    selectList: [] as baseStudent[],

    getStudentIndexById(id: number) {
        return this.selectList.findIndex((item: baseStudent) => item.Id === id)
    },

    deleteStudent(id: number) {
        const index: number = this.getStudentIndexById(id)
        this.selectList.splice(index, 1)
        this.setData()
    },
    pushStudent(student: baseStudent) {
        for (const item of this.selectList) {
            if (item.Id === student.Id && item.Avatar === student.Avatar) return
        }
        this.selectList.push(student)
        this.setData()
    },

    setData() {
        localStorage.setItem('selectHistory', JSON.stringify(this.selectList))
    },
    getData() {
        const data = localStorage.getItem('selectHistory')
        this.selectList = data != null ? JSON.parse(data) : ([] as baseStudent[])
    },
    resetData() {
        this.selectList = [] as baseStudent[]
        this.setData()
    }
})
