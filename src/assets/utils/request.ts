import axios from 'axios'
import { myStudent } from './interface'
import { Traditionalized } from './tw_cn'

const prefixTable: { [key: string]: string[] } = {
    bunnygirl: ['兔', '兔女郎'],
    casual: ['私服', '滑板'],
    cheerleader: ['啦', '拉', '应援', '应援服', '啦啦队', '拉拉队'],
    christmas: ['圣', '圣诞'],
    gym: ['体', '运', '体操', '体操服', '运动', '运动服'],
    hotspring: ['温泉'],
    maid: ['女仆', "妹抖", "妹"],
    newyear: ['新', '春', '新春', '新年', '正月'],
    riding: ['单车', '骑行'],
    swimsuit: ['水', '泳', '泳装'],
    young: ['幼', '幼女']
}

const getSchaleImg = (collection: string) => {
    return `https://schale.gg/images/student/collection/${collection}.webp`
}

const getSchaleSchoolIcon = (school: string) => {
    return `https://schale.gg/images/schoolicon/School_Icon_${school.toUpperCase()}_W.png`
}

const getData = async (file: string) => {
    let data: any[] = []
    await axios.get(file).then((res) => (data = res.data))
    return data
}

const getSchale = async (lng: string) => {
    const local = await getData('/momotalk/students.json')
    const schale = await getData(`https://schale.gg/data/${lng}/students.min.json`)
    const results: myStudent[] = []
    for (const schaleItem of schale) {
        const localItem = local.find((ele) => ele.Id === schaleItem.Id)

        const newStudent: myStudent = {
            Id: schaleItem.Id,
            Name: schaleItem.Name,
            Birthday: schaleItem.Birthday,
            Avatar: [getSchaleImg(schaleItem.Id), ...(localItem ? localItem.Avatar : [])],
            Bio: (localItem && localItem.Bio[lng]) ? localItem.Bio[lng] : "",
            Nickname: [schaleItem.PathName, ...(localItem ? localItem.Nickname : [])],
            School: (localItem && localItem.School) ? localItem.School : schaleItem.School,
            cnt: 0
        }

        // filling empty bio
        if (localItem && lng == 'en' && !localItem.Bio['en'])
            newStudent.Bio = localItem.Bio['jp']
        if (localItem && lng == 'tw' && !localItem.Bio['tw'])
            newStudent.Bio = Traditionalized(localItem.Bio['zh']) as string

        // generating nicknames: add prefix
        if (localItem && localItem.related) {
            const relatedInfo: [number, string] = localItem.related
            const relatedItem = results.find((ele) => ele.Id === relatedInfo[0])
            const prefixs = prefixTable[relatedInfo[1]]
            for (const prefix of prefixs) {
                newStudent.Nickname.push(prefix + relatedItem!.Name)
                newStudent.Nickname.push(...relatedItem!.Nickname.map(nickname => prefix + nickname))
            }
        }
        newStudent.Nickname.push(...Traditionalized(newStudent.Nickname))
        results.push(newStudent)
    }
    return results
}

const getLocal = async (lng: string) => {
    const local = await getData('/momotalk/students2.json')
    const results: myStudent[] = []
    for (const localItem of local) {
        const newStudent: myStudent = {
            Id: localItem.Id,
            Name: localItem.Name[lng] ? localItem.Name[lng] : localItem.Name['en'],
            Birthday: '???',
            Avatar: [`/momotalk/Avatars/${localItem.Nickname[0]}.webp`, ...localItem.Avatar],
            Bio: localItem.Bio[lng] ? localItem.Bio[lng] : localItem.Bio['en'],
            Nickname: [...localItem.Nickname, ...Traditionalized(localItem.Nickname)],
            School: localItem.School ? localItem.School : '',
            cnt: 0
        }
        results.push(newStudent)
    }
    return results
}

const getStudents = async (lng: string) => {
    const data1: myStudent[] = await getSchale(lng)
    const data2: myStudent[] = await getLocal(lng)
    return [data1, data2]
}

const getMessage = async (storyid: string, story: string) => {
    const res = await getData(`/momotalk/Stories/${storyid}/${story}.json`)
    return res
}

const getStickers = async (student: number) => {
    const res = await getData(`/momotalk/Stories/${student}/Stickers.json`)
    return res
}

export { getStudents, getMessage, getSchaleImg, getSchaleSchoolIcon, getStickers }
