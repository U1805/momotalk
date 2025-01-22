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

type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

interface LocalStudent {
    Id: number
    Bio: Record<string, string>
    Avatar: string[]
    Nickname: string[]
    Fixed: Array<{
        ItemName: KeysOfType<studentInfo, string>
        ItemValue: string
        ItemLanguage?: Array<'zh' | 'tw' | 'jp' | 'kr' | 'en'>
    }>
    Related: {
        ItemId: number
        ItemType: string
    } | null
}

interface SchaleStudent {
    Id: number
    Name: string
    Birthday: string
    PathName: string
    School: string
}

interface Talk extends baseStudent {
    type: number // 0: student| 1: sensei| 2: story| 3: choice| 4:system
    content: string
    // 显示头像的标记 flag  0: 非同类型第一条，不显示| 1: 非同类型第一条，显示 |2: 同类型第一条，显示
    flag: number
}

interface ProxyConfig {
    schale: string
    domain: Record<string, string>
    proxy: Record<string, { domain: string; param: string }>
}

export { baseStudent, studentInfo, LocalStudent, SchaleStudent, Talk, ProxyConfig }
