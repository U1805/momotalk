import axios from 'axios'
import { studentInfo } from './interface'
import { Traditionalized } from './tw_cn'

const prefixTable: { [key: string]: string[] } = {
    // 删除部分单字，如 '春' 可以被 '新春' 匹配到，'车' 可以被 '单车' 匹配到，'营''山' 同理
    bunnygirl: ['兔', '兔女郎'],
    casual: ['私服', '滑板'],
    cheerleader: ['啦', '拉', '啦啦队', '拉拉队', '应援', '应援服'],
    christmas: ['圣', '圣诞'],
    gym: ['体', '体操', '体操服', '运', '运动', '运动服'],
    hotspring: ['温', '温泉'],
    maid: ['妹', '妹抖', '女仆'],
    newyear: ['新', '新春', '新年', '正月'],
    riding: ['单车', '骑行'],
    swimsuit: ['水', '泳', '泳装'],
    young: ['幼', '幼女'],
    camping: ['野', '露', '露营', '野营', '登山']
}

function proxy(url: string): string
function proxy(url: string[]): string[]

function proxy(url: string | string[]) {
    if (typeof url === 'string') {
        if (url.indexOf('nocookie') !== -1 || url.indexOf('api.kivo.wiki') !== -1)
            return 'https://wsrv.nl/?url=' + url + '&output=webp'
        else
            return url.replace('/api', 'https://cdn.jsdelivr.net/gh/BlueArcbox/resources')
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
    let data: any[] = []
    await axios.get(proxy(file)).then((res) => (data = res.data))
    return data
}

const getSchale = async (lng: string) => {
    const local = await getData('/api/Momotalk/students.json')
    const schale = await getData(`https://schale.gg/data/${lng}/students.min.json`)
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

        // generating nicknames: add prefix
        if (localItem && localItem.related) {
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
    const local = await getData('/api/Momotalk/students2.json')
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
    const res = await getData(`/api/Stories/${storyid}/${story}.json`)
    return res
}

const getStickers = async (student: number) => {
    const res = await getData(`/api/Stories/${student}/Stickers.json`)
    return res
}

export { getStudents, getMessage, getSchaleImg, getSchaleSchoolIcon, getStickers, proxy }
