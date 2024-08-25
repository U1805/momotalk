interface baseStudent {
    Id: number
    Name: string
    Avatar: string
}

interface studentInfo {
    Id: number
    Name: string
    Birthday: string
    Avatars: string[]
    Bio: string
    Nickname: string[]
    School: string
    cnt: number
}

/* Aru: studentInfo = {
    "Id": 10000,
    "Name": "阿露",
    "Birthday": "3月12日",
    "Avatar": ["https://static.wikia.nocookie.net/blue-archive/images/d/de/Aru_Icon.png"],
    "Bio": "什么都能解决哦！",
    "Nickname": ["Aru", "社长", "亚瑠", "阿鲁"],
    "cnt": 0
}*/

interface Talk extends baseStudent {
    type: number // 0: student| 1: sensei| 2: story| 3: choice| 4:system
    content: string
    // 显示头像的标记 flag  0: 非同类型第一条，不显示| 1: 非同类型第一条，显示 |2: 同类型第一条，显示
    flag: number
}

interface ProxyConfig {
    schale: string
    domain: { [key: string]: string }
    proxy: { [key: string]: { domain: string; param: string } }
}

export { baseStudent, studentInfo, Talk, ProxyConfig }
