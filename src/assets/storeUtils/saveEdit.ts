import { talkHistory } from './talkHistory'

function saveEdit(event: Event, id: number, type: string) {
    var span = event.target as HTMLElement
    if (type === 'name') talkHistory.setTalkName(id, span.innerText)
    if (type === 'content') talkHistory.setTalkContent(id, span.innerText)
}

function saveReplyEdit(event: Event, id: number, index: number) {
    // ChatDraggable 中编辑后保存，需要特殊处理 reply
    const div = event.target as HTMLElement
    let split = talkHistory.getTalkById(id).content.split('\n')
    if(index < split.length) split[index] = div.innerText
    talkHistory.setTalkContent(id, split.join('\n'))
}

function keyHandle(event:KeyboardEvent, id:number, index:number){
    const div = event.target as HTMLElement
    let split = talkHistory.getTalkById(id).content.split('\n')

    if (event.key === 'Enter') {
        event.preventDefault()
        split.splice(index+1, 0, '')
        div.blur()
        talkHistory.setTalkContent(id, split.join('\n'))
    } else if (event.key === 'Backspace' && div.innerText === ''){
        split.splice(index, 1)
        talkHistory.setTalkContent(id, split.join('\n'))
    }
}

export { saveEdit, saveReplyEdit, keyHandle }
