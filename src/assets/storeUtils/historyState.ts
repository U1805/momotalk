import { Talk } from '../utils/interface'

const historyState = {
    state: [] as Talk[][],
    top: 0 as number,
    cur: -1 as number,
    max_size: 20 as number,

    push(ele: Talk[]) {
        if (this.state.length >= this.max_size) {
            this.state.splice(0, 1)
            this.cur--
        }
        this.state[++this.cur] = JSON.parse(JSON.stringify(ele))
        this.top = this.cur + 1
    },
    undo() {
        if (this.cur > 0) this.cur -= 1
        return this.state[this.cur]
    },
    redo() {
        if (this.cur < this.top - 1) this.cur += 1
        return this.state[this.cur]
    }
}

export { historyState }
