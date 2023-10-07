import { sendText } from './send'
import { getRole } from './role'
import { myStudent } from '../utils/interface'
import { getMessage } from '../utils/request'
import { waitClick, waitTime } from '../utils/wait'
import { talkHistory } from '../storeUtils/talkHistory'
import { store } from '../storeUtils/store'

const play = async (
    confirm: boolean,
    storyKey: string,
    storyFile: string,
    storyLng: string
) => {
    store.showDialog = false
    if (!confirm || !(storyKey && storyFile && storyLng)) {
        return
    }
    // 隐藏发送栏
    const talklist = document.getElementById('talkList') as HTMLDivElement
    talklist.setAttribute('style', 'height:100%')

    const data = await getMessage(storyKey, storyFile)
    const student = getRole(data[0][storyLng], data[0]['ImagePath'])
    let item = data[1]
    talkHistory.resetData()
    let text: string = ''
    let selected: myStudent | number
    do {
        if (item.Type === 3) {
            // choice
            const choices = data.filter((ele) => ele.MessageId === item.MessageId)
            text = choices.map((choice) => choice[storyLng]).join('\n')
            sendText(item.Type, text)
            await waitTime(100)
            // reply
            const buttons = document.querySelectorAll('div.choice span > div')
            text = (await waitClick(buttons)) as string
            item = data.find((ele) => ele[storyLng] === text)
            talkHistory.deleteTalkByIndex(-1)
            sendText(1, text)
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
            const buttons2 = document.querySelectorAll('.box-story')
            await waitClick(buttons2)
        } else {
            await waitTime(1500)
        }
    } while ((item = data.find((ele) => ele.MessageId === item.NextId)))

    // 恢复发送栏
    talklist.setAttribute('style', '')
}

export { play }
