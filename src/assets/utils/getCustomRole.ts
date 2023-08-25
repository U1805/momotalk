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
    var customId = getRandomInt(100)
    while (!check(customId)) {
        customId = getRandomInt(100)
    }
    return customId
}

function getName() {
    var name: string | null = ''
    while (name.length === 0) {
        name = prompt(i18n.global.t('customRoleInfo'))
        if (name === null) return
    }
    return name
}

function getRole(avatar: string) {
    var name = getName()
    if (name === undefined) return
    var student: myStudent = {
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

export { getRole }
