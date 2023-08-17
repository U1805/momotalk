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
    type: number // 0: student| 1: sensei| 2: story| 3: choice| 4:system
    content:
        | {
              // student or sensei
              name: string
              avatar: string
              flag: number // 0: 非同类型第一条，不显示头像| 1: 非同类型第一条，显示头像 |2: 同类型第一条
              text: string
          }
        | string // others
}

export { myStudent, Talk }
