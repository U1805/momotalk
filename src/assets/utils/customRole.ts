import i18n from '../locales/i18n'
import { myStudent } from './interface'
import { store } from './store'

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}
function check(num: number) {
    return store.selectList.findIndex((ele) => ele.Id === num) === -1
}

function getId() {
    let customId = getRandomInt(100)
    while (!check(customId)) {
        customId = getRandomInt(100)
    }
    return customId
}

function getName() {
    let name: string | null = ''
    while (name.length === 0) {
        name = prompt(i18n.global.t('customRoleInfo'))
        if (name === null) return
    }
    return name
}

function getRole(avatar: string) {
    const name = getName()
    if (name === undefined) return
    const student: myStudent = {
        Id: getId(),
        Name: name,
        Avatar: [avatar],
        Birthday: '',
        Bio: '',
        Nickname: [''],
        School: '',
        cnt: 0
    }
    return student
}

function getTestRole(name: string, avatar: string){
    const student: myStudent = {
        Id: 1,
        Name: name,
        Avatar: [avatar],
        Birthday: '',
        Bio: '',
        Nickname: [''],
        School: '',
        cnt: 0
    }
    return student
}

export { getRole, getTestRole }
