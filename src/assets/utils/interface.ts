interface myStudent {
    Id: number
    Name: string
    Birthday: string
    Avatar: string[]
    Bio: string
    Nickname: string[]
    cnt: number
}

// "Id": 10000,
// "Name": "阿露",
// "Birthday": "3月12日",
// "Avatar": ["https://static.wikia.nocookie.net/blue-archive/images/d/de/Aru_Icon.png"],
// "Bio": "什么都能解决哦！",
// "Nickname": ["Aru", "社长", "亚瑠", "阿鲁"],
// "cnt": 0

interface Talk {
    id: number
    type: number // 0: sensei| 1: student| 2: story| 3: system
    name: string
    avatar: string
    talks: { id: number; content: string }[]
}

export { myStudent, Talk }
