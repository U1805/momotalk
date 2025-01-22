import { Resource } from './cache'
import { studentInfo, LocalStudent, SchaleStudent } from './interface'
import { Traditionalized } from './tw_cn'

const resourceInstance = new Resource()
await resourceInstance.loadConfig()
const getData = <T>(file: string): Promise<T> => resourceInstance.getData(file)
const proxy = (url: string[]) => resourceInstance.proxy(url)
const schale_url = resourceInstance.getSchale()

/*
数据请求方法
*/
const getSchaleImg = (student: number) => {
    return `${schale_url}/images/student/collection/${student}.webp`
}

const getSchoolIcon = (school: string) => {
    return `${schale_url}/images/schoolicon/${school}.png`
}

const getMessage = async (student: string, storyid: string) => {
    return (await getData(`/api/Stories/${student}/${storyid}.json`)) as any[]
}

const getStickers = async (student: number) => {
    return (await getData(`/api/Stories/${student}/Stickers.json`)) as any[]
}

const getStudentsPart1 = async (lng: string) => {
    const tools = {
        getOrderedKeys: () => {
            const orderedIds = local.map((item) => item.Id)
            const schaleIds = Object.values(schale).map((studentInfo) => studentInfo.Id)
            const localIdSet = new Set(orderedIds)
            const schaleSet = new Set(schaleIds)

            const filteredLocalIds = orderedIds.filter((id) => schaleSet.has(id))
            const additionalIds = schaleIds.filter((id) => !localIdSet.has(id))

            return [...filteredLocalIds, ...additionalIds]
        },

        initStudentObject: (schaleItem: SchaleStudent): studentInfo => ({
            Id: schaleItem.Id,
            Name: schaleItem.Name,
            Birthday: schaleItem.Birthday,
            Avatars: [getSchaleImg(schaleItem.Id)],
            Bio: '',
            Nickname: [schaleItem.PathName.replace('_', ' ')],
            School: schaleItem.School,
            cnt: 0
        }),

        fixStudentFields: (student: studentInfo, localItem: LocalStudent) => {
            // filling avatar
            student.Avatars.push(...localItem.Avatar)
            student.Avatars = proxy(student.Avatars)

            // filling empty bio
            if (localItem.Bio[lng]) student.Bio = localItem.Bio[lng]
            if (lng == 'en' && !localItem.Bio['en']) student.Bio = localItem.Bio['jp']
            if (lng == 'tw' && !localItem.Bio['tw'])
                student.Bio = Traditionalized(localItem.Bio['zh'])

            // fixing item fileds
            type ValidLanguage = 'en' | 'zh' | 'tw' | 'jp' | 'kr'
            for (const fixeditem of localItem.Fixed) {
                if (
                    !fixeditem.ItemLanguage ||
                    fixeditem.ItemLanguage.includes(lng as ValidLanguage)
                ) {
                    student[fixeditem.ItemName] = fixeditem.ItemValue
                }
            }
        },

        fillNickname: (student: studentInfo, localItem: LocalStudent) => {
            student.Nickname.push(...localItem.Nickname)

            if (localItem.Related && prefixTable[localItem.Related.ItemType]) {
                const relatedId = localItem.Related.ItemId
                const relatedSchaleItem = schale[relatedId]
                const relatedLocalItem = local.find((ele) => ele.Id === relatedId)
                const nicknames = relatedLocalItem?.Nickname || []
                const prefixes = prefixTable[localItem.Related.ItemType]
                for (const prefix of prefixes) {
                    student.Nickname.push(
                        prefix + relatedSchaleItem.Name,
                        prefix + relatedSchaleItem.PathName,
                        ...nicknames.map((nickname) => prefix + nickname)
                    )
                }
            }
        }
    }

    const [local, schale, prefixTable] = await Promise.all([
        getData<LocalStudent[]>('/api/Momotalk/students.json'),
        getData<Record<string, SchaleStudent>>(
            `${schale_url}/data/${lng}/students.min.json`
        ),
        getData<Record<string, string[]>>('/api/Momotalk/prefixTable.json')
    ])

    const orderedKeys = tools.getOrderedKeys()

    return orderedKeys.map((key) => {
        const schaleItem = schale[key.toString()]
        const localItem = local.find((ele) => ele.Id === key)
        const newStudent = tools.initStudentObject(schaleItem)

        if (!localItem) return newStudent

        tools.fixStudentFields(newStudent, localItem)
        tools.fillNickname(newStudent, localItem)
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
            cnt: 0
        } as studentInfo
    })
}

const getStudents = async (lng: string) => {
    const data1: studentInfo[] = await getStudentsPart1(lng)
    const data2: studentInfo[] = await getStudentsPart2(lng)
    return [data1, data2]
}

export { getStudents, getMessage, getSchaleImg, getSchoolIcon, getStickers, proxy }
