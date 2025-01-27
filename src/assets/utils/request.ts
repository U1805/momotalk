import { Resource } from './cache'
import { studentInfo, LocalStudent } from './interface'
import { Traditionalized } from './tw_cn'

const resourceInstance = new Resource()
await resourceInstance.loadConfig()
const getData = <T>(file: string): Promise<T> => resourceInstance.getData(file)
const proxy1 = (url: string) => resourceInstance.proxy(url)
const proxy = (url: string[]) => resourceInstance.proxy(url)

const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

type SupportedLanguage = 'zh' | 'tw' | 'jp' | 'kr' | 'en'

const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
    }
}

const DATE_FORMATS = (birthday: string, lng: SupportedLanguage) => {
    const TOOL = {
        zh: (month: number, day: number) => `${month}月${day}日`,
        tw: (month: number, day: number) => `${month}月${day}日`,
        jp: (month: number, day: number) => `${month}月${day}日`,
        kr: (month: number, day: number) => `${month}월 ${day}일`,
        en: (month: number, day: number) =>
            `${MONTHS_EN[month - 1]} ${day}${getOrdinalSuffix(day)}`
    }
    const [month, day] = birthday.split('/').map(Number)
    return TOOL[lng](month, day)
}

/*
数据请求方法
*/
const getAvatarImg = (student: number) => {
    return proxy1(`/api/Avatars/Kivo/Released/${student}.webp`)
}

const getSchoolIcon = (school: string) => {
    return proxy1(`/api/Schools/${school}.png`)
}

const getMessage = async (student: string, storyid: string) => {
    return (await getData(`/api/Stories/${student}/${storyid}.json`)) as any[]
}

const getStickers = async (student: number) => {
    return (await getData(`/api/Stories/${student}/Stickers.json`)) as any[]
}

const getStudentsPart1 = async (lng: string) => {
    const tools = {
        initStudentObject: (localItem: LocalStudent): studentInfo => ({
            Id: localItem.Id,
            Name: tools.fixStudentField(localItem, 'Name'),
            Birthday: DATE_FORMATS(localItem.Birthday, lng as SupportedLanguage),
            Avatars: proxy(localItem.Avatar),
            Bio: tools.fixStudentField(localItem, 'Bio'),
            Nickname: localItem.Nickname,
            School: localItem.School || 'ETC',
            RelatedStudent: [],
            cnt: 0
        }),

        fixStudentField: (localItem: LocalStudent, field: 'Name' | 'Bio') => {
            // filling empty name or bio
            if (lng == 'en' && !localItem[field]['en']) return localItem[field]['jp']
            if (lng == 'tw' && !localItem[field]['tw'])
                return Traditionalized(localItem[field]['zh'])
            return localItem[field][lng]
        },

        fillNickname: (student: studentInfo, localItem: LocalStudent) => {
            student.Nickname.push(...localItem.Nickname)

            if (localItem.Related && prefixTable[localItem.Related.ItemType]) {
                const relatedId = localItem.Related.ItemId
                const relatedLocalItem = local.find((ele) => ele.Id === relatedId)
                const nicknames = relatedLocalItem?.Nickname || []
                const prefixes = prefixTable[localItem.Related.ItemType]
                for (const prefix of prefixes) {
                    student.Nickname.push(
                        localItem.Nickname[0] + ' ' + localItem.Related.ItemType,
                        prefix + tools.fixStudentField(localItem, 'Name'),
                        ...nicknames.map((nickname) => prefix + nickname)
                    )
                }
            }
        },

        fillRelatedStudent: (student: studentInfo, localItem: LocalStudent) => {
            const relatedStudents = !localItem.Related
                ? local.filter((ele) => ele.Related?.ItemId === student.Id)
                : [
                      local.find((ele) => ele.Id === localItem.Related!.ItemId)!,
                      ...local.filter(
                          (ele) =>
                              ele.Related?.ItemId === localItem.Related!.ItemId &&
                              ele.Id !== localItem.Id
                      )
                  ]

            student.RelatedStudent = relatedStudents.map((ele) => ({
                Id: ele.Id,
                Name: tools.fixStudentField(ele, 'Name'),
                Avatar: proxy1(ele.Avatar[0])
            }))
        }
    }

    const [local, prefixTable] = await Promise.all([
        getData<LocalStudent[]>('/api/Momotalk/students.json'),
        getData<Record<string, string[]>>('/api/Momotalk/prefixTable.json')
    ])

    return local.map((localItem) => {
        const newStudent = tools.initStudentObject(localItem)
        tools.fillNickname(newStudent, localItem)
        tools.fillRelatedStudent(newStudent, localItem)
        return newStudent
    })
}

const getStudentsPart2 = async (lng: string) => {
    const local = (await getData('/api/Momotalk/students2.json')) as any[]
    return local.map((localItem) => {
        return {
            Id: localItem.Id,
            Name: localItem.Name[lng] ? localItem.Name[lng] : localItem.Name['en'],
            Birthday: '???',
            Avatars: proxy([
                `/api/Avatars/${localItem.Nickname[0]}.webp`,
                ...localItem.Avatar
            ]),
            Bio: localItem.Bio[lng] ? localItem.Bio[lng] : localItem.Bio['en'],
            Nickname: localItem.Nickname,
            School: localItem.School ? localItem.School : '',
            RelatedStudent: [],
            cnt: 0
        } as studentInfo
    })
}

const getStudents = async (lng: string) => {
    const data1: studentInfo[] = await getStudentsPart1(lng)
    const data2: studentInfo[] = await getStudentsPart2(lng)
    return [data1, data2]
}

export { getStudents, getMessage, getSchoolIcon, getAvatarImg, getStickers, proxy }
