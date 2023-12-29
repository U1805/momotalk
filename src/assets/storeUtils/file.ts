import { selectList } from './selectList'
import { store } from './store'
import { talkHistory } from './talkHistory'

const exportJson = () => {
    const json: object = {
        talkId: talkHistory.talkId,
        talkHistory: talkHistory.talkHistory,
        selectList: selectList.selectList
    }
    const jsonStr = JSON.stringify(json, null, 4)
    const url = window.URL || window.webkitURL || window
    const blob = new Blob([jsonStr])
    const saveLink = document.createElement('a')
    saveLink.href = url.createObjectURL(blob)
    saveLink.download = `Momotalk-export-${Date.now()}.json`
    saveLink.click()
}

const importJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/JSON'
    input.onchange = () => {
        const files = input.files![0]
        let reader = new FileReader()
        reader.readAsText(files)
        reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
            const json: { talkId: number; talkHistory: []; selectList: [] } = JSON.parse(
                e.target!.result as string
            )
            try {
                if (!json.talkId || !json.talkHistory || !json.selectList)
                    throw new TypeError('Invalid file!')
            } catch (err) {
                console.error((err as TypeError).message)
                alert((err as TypeError).message)
                return
            }
            talkHistory.talkId = json.talkId
            talkHistory.talkHistory = json.talkHistory
            selectList.selectList = json.selectList
            store.setData()
        })
    }
    input.click()
}

export { exportJson, importJson }
