import axios from 'axios'
import { studentInfo } from './interface'
import { Traditionalized } from './tw_cn'

function proxy(url: string): string
function proxy(url: string[]): string[]

function proxy(url: string | string[]) {
    if (typeof url === 'string') {
        if (url.indexOf('nocookie') !== -1 || url.indexOf('api.kivo.wiki') !== -1)
            return 'https://wsrv.nl/?url=' + url + '&output=webp'
        else
            return url.replace('/api', 'https://BlueArcbox.github.io/resources')
    } else {
        return url.map((ele) => proxy(ele))
    }
}

const getSchaleImg = (collection: string) => {
    return `https://schale.gg/images/student/collection/${collection}.webp`
}

const getSchaleSchoolIcon = (school: string) => {
    return `https://schale.gg/images/schoolicon/School_Icon_${school.toUpperCase()}_W.png`
}

const getData = async (file: string) => {
    let data: any
    await axios.get(proxy(file)).then((res) => (data = res.data))
    return data
}

const getSchale = async (lng: string) => {
    const schale      = await getData(`https://schale.gg/data/${lng}/students.min.json`) as any []
    const local       = await getData('/api/Momotalk/students.json') as any[]
    const prefixTable = await getData('/api/Momotalk/prefixTable.json') as { [key: string]: string[] }
    const results: studentInfo[] = []
    for (const schaleItem of schale) {
        const localItem = local.find((ele) => ele.Id === schaleItem.Id)

        const newStudent: studentInfo = {
            Id: schaleItem.Id,
            Name: schaleItem.Name,
            Birthday: schaleItem.Birthday,
            Avatars: proxy([
                getSchaleImg(schaleItem.Id),
                ...(localItem ? localItem.Avatar : [])
            ]),
            Bio: localItem && localItem.Bio[lng] ? localItem.Bio[lng] : '',
            Nickname: [schaleItem.PathName, ...(localItem ? localItem.Nickname : [])],
            School: localItem && localItem.School ? localItem.School : schaleItem.School,
            cnt: 0
        }

        // filling empty bio
        if (localItem && lng == 'en' && !localItem.Bio['en'])
            newStudent.Bio = localItem.Bio['jp']
        if (localItem && lng == 'tw' && !localItem.Bio['tw'])
            newStudent.Bio = Traditionalized(localItem.Bio['zh'])
        // fix zh name
        if (localItem && lng == 'zh' && localItem.Name)
            newStudent.Name = localItem.Name

        // generating nicknames: add prefix
        if (localItem && localItem.related && prefixTable.hasOwnProperty(localItem.related[1])) {
            const relatedInfo: [number, string] = localItem.related
            const relatedItem = results.find((ele) => ele.Id === relatedInfo[0])!
            var prefixs = prefixTable[relatedInfo[1]]
            for (const prefix of prefixs) {
                newStudent.Nickname.push(prefix + relatedItem!.Name)
                newStudent.Nickname.push(
                    ...relatedItem.Nickname.map((nickname) => prefix + nickname)
                )
            }
        }
        results.push(newStudent)
    }
    return results
}

const getLocal = async (lng: string) => {
    const local = await getData('/api/Momotalk/students2.json') as any[]
    const results: studentInfo[] = []
    for (const localItem of local) {
        const newStudent: studentInfo = {
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
        }
        results.push(newStudent)
    }
    return results
}

const getStudents = async (lng: string) => {
    const data1: studentInfo[] = await getSchale(lng)
    const data2: studentInfo[] = await getLocal(lng)
    return [data1, data2]
}

const getMessage = async (storyid: string, story: string) => {
    const res = await getData(`/api/Stories/${storyid}/${story}.json`) as any[]
    return res
}

const getStickers = async (student: number) => {
    const res = await getData(`/api/Stories/${student}/Stickers.json`) as any[]
    return res
}

export { getStudents, getMessage, getSchaleImg, getSchaleSchoolIcon, getStickers, proxy }
