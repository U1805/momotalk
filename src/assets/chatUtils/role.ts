import { baseStudent } from '../utils/interface'
import { selectList } from '../storeUtils/selectList'

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}
function check(num: number) {
    return selectList.getStudentIndexById(num) === -1
}

function getId() {
    let customId = getRandomInt(100)
    while (!check(customId)) {
        customId = getRandomInt(100)
    }
    return customId
}

function getRole(name: string, avatar: string) {
    const student: baseStudent = {
        Id: getId(),
        Name: name,
        Avatar: avatar
    }
    return student
}

export { getRole, getId }
