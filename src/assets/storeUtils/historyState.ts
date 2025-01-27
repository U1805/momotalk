import { Talk } from '../requestUtils/interface'

const deepcopy = (obj:Object)=>{
    return JSON.parse(JSON.stringify(obj))
}

const historyState = {
    state: [] as Talk[][],
    cur: -1 as number,
    max_size: 20 as number,

    push(ele: Talk[]) {
        if (this.cur < this.state.length - 1) {
            this.state.splice(this.cur + 1)
        }
        this.state.push(deepcopy(ele))
        this.cur++

        if (this.state.length >= this.max_size) {
            this.state.shift()
            this.cur--
        }
    },
    value() {
        return this.state[this.cur]
    },
    undo() {
        if (this.cur > 0) this.cur--
        return deepcopy(this.state[this.cur])
    },
    redo() {
        if (this.cur < this.state.length - 1) this.cur++
        return deepcopy(this.state[this.cur])
    }
}

export { historyState }
