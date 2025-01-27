import { Resource } from './cache'
import { studentInfo, LocalStudent } from './interface'
import { Traditionalized } from '../utils/tw_cn'
import { dateFormat, SupportedLanguage } from './dateFormat'

const resourceInstance = new Resource()
await resourceInstance.loadConfig()
const getData = <T>(file: string): Promise<T> => resourceInstance.getData(file)
const proxy1 = (url: string) => resourceInstance.proxy(url)
const proxy = (url: string[]) => resourceInstance.proxy(url)

/*
数据请求方法
*/
const getAvatarImg = (student: number) => {
    return proxy1(`/api/Avatars/Kivo/Released/${student}.webp`)
}

const getSchoolIcon = (school: string) => {
    if (
        ![
            'Abydos',
            'Arius',
            'ETC',
            'Gehenna',
            'Hyakkiyako',
            'Millennium',
            'RedWinter',
            'Shanhaijing',
            'SRT',
            'Tokiwadai',
            'Trinity',
            'Valkyrie'
        ].includes(school)
    )
        return proxy1(`/api/Schools/ETC.png`)
    return proxy1(`/api/Schools/${school}.png`)
}

const getMessage = async (student: string, storyid: string) => {
    return (await getData(`/api/Stories/${student}/${storyid}.json`)) as any[]
}

const getStickers = async (student: number) => {
    return (await getData(`/api/Stories/${student}/Stickers.json`)) as any[]
}

const getStudents = async (lng: string) => {
    const tools = {
        initStudentObject: (localItem: LocalStudent): studentInfo => ({
            Id: localItem.Id,
            Avatars: proxy(localItem.Avatar),
            Name: tools.fixStudentField(localItem, 'Name'),
            Bio: tools.fixStudentField(localItem, 'Bio'),
            Nickname: localItem.Nickname,
            Birthday: dateFormat(localItem.Birthday, lng as SupportedLanguage) || '???',
            Age: localItem.Age || '',
            School: localItem.School || 'ETC',
            Club: localItem.Club || '',
            Star: localItem.Star || 0,
            Released: localItem.Released || false,
            RelatedStudent: [],
            cnt: 0
        }),

        fixStudentField: (localItem: LocalStudent, field: 'Name' | 'Bio') => {
            // filling empty name or bio
            if (lng == 'en' && !localItem[field]['en'])
                return localItem[field]['jp'] || ''
            if (lng == 'kr' && !localItem[field]['kr'])
                return localItem[field]['jp'] || ''
            if (lng == 'tw' && !localItem[field]['tw'])
                return localItem[field]['zh']
                    ? Traditionalized(localItem[field]['zh'])
                    : ''
            return localItem[field][lng] || ''
        },

        fillNickname: (student: studentInfo, localItem: LocalStudent) => {
            if (localItem.Related && prefixTable[localItem.Related.ItemType]) {
                const relatedId = localItem.Related.ItemId
                const relatedLocalItem = local.find((ele) => ele.Id === relatedId)
                const nicknames = relatedLocalItem?.Nickname || []
                const prefixes = prefixTable[localItem.Related.ItemType]
                for (const prefix of prefixes) {
                    student.Nickname.push(
                        localItem.Nickname[0] + localItem.Related.ItemType,
                        prefix + tools.fixStudentField(localItem, 'Name') + prefix,
                        ...nicknames.map((nickname) => prefix + nickname + prefix)
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

export { getStudents, getMessage, getSchoolIcon, getAvatarImg, getStickers, proxy }
