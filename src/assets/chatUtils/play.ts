import { sendText } from './send'
import { getId, getRole } from './role'
import { baseStudent, Talk } from '../utils/interface'
import { getMessage, getSchaleImg } from '../utils/request'
import { waitClick, waitTime } from '../utils/wait'
import { store } from '../storeUtils/store'
import { talkHistory } from '../storeUtils/talkHistory'

const play = async (
    confirm: boolean,
    storyKey: string,
    storyFile: string,
    storyLng: string
) => {
    store.showPlayerDialog = false
    if (!confirm || !(storyKey && storyFile && storyLng)) return false
    const data = await getMessage(storyKey, storyFile)
    if (!data[2][storyLng]) return false
    // 隐藏发送栏
    const talklist = document.getElementById('talkList') as HTMLDivElement
    talklist.setAttribute('style', 'height:100%')
    talklist.className = talklist.className.replace("show-action", "hidden-action")

    const student = getRole(data[0][storyLng], getSchaleImg(data[0]['CharacterId']))
    let item = data[1]
    talkHistory.resetData()
    let text: string = '', selected: baseStudent | number
    do {
        if (item.Type === 3) {
            // choice
            const choices = data.filter((ele) => ele.MessageId === item.MessageId)
            text = choices.map((choice) => choice[storyLng]).join('\n')
            sendText(item.Type, text)
            await waitTime(100)
            // reply
            const buttons = document.querySelectorAll('div.choice span > span') as NodeListOf<HTMLElement>
            text = (await waitClick(buttons)) as string
            item = data.find((ele) => ele[storyLng] === text)
            talkHistory.deleteTalkByIndex(-1)
            sendText(1, text)
            await waitTime(1500)
            continue
        }

        selected = item.Type > 0 ? item.Type : student
        if (item.MessageType === 'Text') {
            text = item[storyLng]
            sendText(selected, text, item.Flag)
        } else if (item.MessageType === 'Image') {
            text = item.ImagePath
            sendText(selected, text)
        }

        if (item.Type === 2) {
            // momotalk story
            await waitTime(100)
            const buttons2 = document.querySelectorAll('.box-story span') as NodeListOf<HTMLElement>
            await waitClick(buttons2)
        } else {
            await waitTime(1500)
        }
    } while ((item = data.find((ele) => ele.MessageId === item.NextId)))

    // 恢复发送栏
    talklist.setAttribute('style', '')
    talklist.className = talklist.className.replace("hidden-action", "show-action")
    return true
}

const play2 = async (items: Talk[]) => {
    store.showSettingDialog = false
    // 隐藏发送栏
    const talklist = document.getElementById('talkList') as HTMLDivElement
    talklist.setAttribute('style', 'height:100%')
    talklist.className = talklist.className.replace("show-action", "hidden-action")

    talkHistory.resetData()
    let text: string = '', selected: baseStudent | number, studentId = getId()
    for (let item of items) {
        if (item.type === 3) {
            // choice
            sendText(item.type, item.content)
            await waitTime(100)
            // reply
            const buttons = document.querySelectorAll('div.choice span > span') as NodeListOf<HTMLElement>
            text = (await waitClick(buttons)) as string
            talkHistory.deleteTalkByIndex(-1)
            sendText(1, text)
            await waitTime(1500)
            continue
        }

        selected = item.type > 0
            ? item.type
            : { Id: studentId, Name: item.Name, Avatar: item.Avatar }
        sendText(selected, item.content, item.flag)

        if (item.type === 2) {
            // momotalk story
            await waitTime(100)
            const buttons2 = document.querySelectorAll('.box-story span') as NodeListOf<HTMLElement>
            await waitClick(buttons2)
        } else {
            await waitTime(1500)
        }
    }

    // 恢复发送栏
    talklist.setAttribute('style', '')
    talklist.className = talklist.className.replace("hidden-action", "show-action")
}

const exportCard = async () => {
    const blob = await window.fetch('shared_file.png').then((response) => response.blob())
    const arrayBuffer = await blob.arrayBuffer()
    const message = '\nMomotalk.json' + JSON.stringify(talkHistory.talkHistory)
    const stringArray = new TextEncoder().encode(message)

    const combinedArray = new Uint8Array(arrayBuffer.byteLength + stringArray.byteLength)
    combinedArray.set(new Uint8Array(arrayBuffer), 0)
    combinedArray.set(stringArray, arrayBuffer.byteLength)

    const blob2 = new Blob([combinedArray], { type: blob.type })
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob2)
    downloadLink.download = `Momotalk-shared-file-${Date.now()}.png`
    downloadLink.click()
}

const importCard = () => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const arrayBuffer = reader.result as ArrayBuffer
        const binaryString = new TextDecoder().decode(new Uint8Array(arrayBuffer))
        if (binaryString.search('Momotalk.json') !== -1)
            play2(JSON.parse(binaryString.split('Momotalk.json')[1]))
        else alert('Invalid file!')
    })

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
        const file = input.files?.[0]
        if (file) reader.readAsArrayBuffer(file)
    }
    input.click()
}

export { play, exportCard, importCard }
