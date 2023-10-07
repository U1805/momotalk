import { talkHistory } from './talkHistory'

function saveReplyEdit(event: Event, id: number, index: number) {
    // ChatDraggable 中编辑后保存，需要特殊处理 reply
    const div = event.target as HTMLElement
    let split = talkHistory.getTalkById(id).content.split('\n')

    if (
        (event as InputEvent).inputType === 'insertParagraph' ||
        (event as InputEvent).inputType === 'insertLineBreak' ||
        ((event as InputEvent).inputType === 'insertText' &&
            (event as InputEvent).data === null)
    ) {
        split = [...split.slice(0, index + 1), '', ...split.slice(index + 1)]
        for (const s of ['\n', '<br>', '<br/>', '<p>', '</p>'])
            div.innerText = div.innerText.replaceAll(s, '')
        div.blur()
    } else if (
        (event as InputEvent).inputType === 'deleteContentBackward' &&
        div.innerText === ''
    )
        split.splice(index, 1)
    else split[index] = div.innerText

    talkHistory.setTalkContent(id, split.join('\n'))
}

export { saveReplyEdit }
