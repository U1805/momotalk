import { readFile } from '../imgUtils/readFile'
import i18n from '@/locales/i18n'
import { baseStudent, Talk } from '../utils/interface'
import { talkHistory } from '../storeUtils/talkHistory'
import { store } from '../storeUtils/store'
import { myReExp } from '../utils/markdown'

const re = new myReExp()

const isSenseiOrStudent = (char: baseStudent | number) => {
    return char === 1 || typeof char !== 'number'
}

const insertText = (
    char: baseStudent | number,
    text: string,
    insertAfterId: number
) => {
    if (text.length === 0) return
    let name = ''
    let type = 0
    let avatar = ''

    if (typeof char === 'number') {
        if (char === 1) name = 'sensei'
        else if (char === 2) name = i18n.global.t('storyEvent')
        else if (char === 3) name = i18n.global.t('reply')
        else if (char === 4) name = 'systemInfo'
        type = char
    } else {
        // student
        name = char.Name
        avatar = char.Avatar
        type = 0
    }

    const newTalk: Talk = {
        Id: talkHistory.talkId++,
        Name: name,
        Avatar: avatar,
        type: type,
        flag: 2,
        content: re.md2html(text)
    }

    talkHistory.insertTalkById(insertAfterId, newTalk)
    store.text = ''
    store.insertId = -1
}

const insertImage = (char: baseStudent | number, insertAfterId: number) => {
    if (!isSenseiOrStudent(char)) return false // 非师生不能插入图片
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const text = reader.result as string // 将图像文件转换为 base64 字符串
        insertText(char, text, insertAfterId)
    })
    readFile(reader)
}

const insertSticker = (char: baseStudent | number, url: string, insertAfterId: number) => {
    if (!isSenseiOrStudent(char)) return false
    insertText(char, url, insertAfterId)
    // 发送后收回 popover
    const sticker = document.getElementById('sticker') as HTMLElement
    sticker.click()
}

export { insertText, insertImage, insertSticker }
