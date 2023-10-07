import { readFile } from '../imgUtils/readFile'
import i18n from '../locales/i18n'
import { myStudent, Talk } from '../utils/interface'
import { store } from '../storeUtils/store'
import { talkHistory } from '../storeUtils/talkHistory'

const isSenseiOrStudent = (char: myStudent | number) => {
    return char === 1 || typeof char !== 'number'
}

const sendText = (char: myStudent | number, text: string, flag: number = 2) => {
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
        avatar = char.Avatar[char.cnt]
        type = 0
    }

    const newTalk: Talk = {
        id: talkHistory.talkId++,
        name: name,
        type: type,
        avatar: avatar,
        flag: flag,
        content: text
    }
    talkHistory.pushTalk(newTalk)

    // console.log(this.store.talkHistory)
    // 打字效果 & 自动 ScrollToBottom
    store.text = ''
    store.typing = 1
    const scroll_to_bottom = document.getElementById('talkList') as HTMLElement
    const timer = setInterval(() => {
        if (store.typing === 1) {
            scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
        }
        if (store.typing < 0) {
            store.typing = 0
            scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
            clearInterval(timer)
        }
        store.typing -= 0.01
    }, 10)
}

const sendImage = (char: myStudent | number, flag: number = 2) => {
    if (!isSenseiOrStudent(char)) return false // 非师生不能插入图片
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const text = reader.result as string // 将图像文件转换为 base64 字符串
        sendText(char, text, flag)
    })
    readFile(reader)
}

const sendSticker = (char: myStudent | number, url: string, flag: number = 2) => {
    if (!isSenseiOrStudent(char)) return false
    sendText(char, url, flag)
    // 发送后收回 popover
    const sticker = document.getElementById('sticker') as HTMLElement
    sticker.click()
}

export { sendText, sendImage, sendSticker }
