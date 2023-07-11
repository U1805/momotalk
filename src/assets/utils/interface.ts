interface myStudent {
    Id: number
    Avatar: string[]
    Birthday: string
    Bio: string
    Name: string
    cnt: number
}

interface Talk {
    id: number
    type: number // 0: sensei| 1: student| 2: story| 3: system
    name: string
    avatar: string
    talks: { id: number; content: string }[]
}

export { myStudent, Talk }
