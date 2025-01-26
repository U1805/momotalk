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

interface LocalStudent {
    Id: number
    Name: Record<string, string>
    Birthday: string
    Avatar: string[]
    Bio: Record<string, string>
    Nickname: string[]
    School: string
    Related: {
        ItemId: number
        ItemType: string
    } | null
}

interface Talk extends baseStudent {
    type: number // 0: student| 1: sensei| 2: story| 3: choice| 4:system
    content: string
    // 显示头像的标记 flag  0: 非同类型第一条，不显示| 1: 非同类型第一条，显示 |2: 同类型第一条，显示
    flag: number
}

interface ProxyConfig {
    domain: Record<string, string>
    proxy: Record<string, { domain: string; param: string }>
}

export { baseStudent, studentInfo, LocalStudent, Talk, ProxyConfig }
