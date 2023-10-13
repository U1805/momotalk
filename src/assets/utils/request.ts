import axios from 'axios'
import { myStudent } from './interface'

const prefixTable: { [key: string]: string[] } = {
    bunnygirl: ['兔', '兔女郎'],
    casual: ['私服', '滑板'],
    cheerleader: ['应援', '啦啦队', '拉拉队'],
    christmas: ['圣诞'],
    gym: ['体', '体操', '运动服', '运动'],
    hotspring: ['温泉'],
    maid: ['女仆'],
    newyear: ['春', '新', '新春', '新年', '正月'],
    riding: ['单车', '骑行'],
    swimsuit: ['泳装', '水'],
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
        const newStudent: myStudent = {
            Id: schaleItem.Id,
            Name: schaleItem.Name,
            Birthday: schaleItem.Birthday,
            Avatar: [getSchaleImg(schaleItem.Id)],
            Bio: '',
            Nickname: [schaleItem.PathName],
            School: schaleItem.School,
            cnt: 0
        }
        const localItem = local.find((ele) => ele.Id === newStudent.Id)
        if (localItem) {
            newStudent.Avatar = newStudent.Avatar.concat(localItem.Avatar)
            newStudent.Bio = localItem.Bio[lng]
            newStudent.Nickname = newStudent.Nickname.concat(localItem.Nickname)
            // add prefix
            if (localItem.related) {
                const relatedInfo: [number, string] = localItem.related
                const relatedItem = results.find((ele) => ele.Id === relatedInfo[0])
                const prefixs = prefixTable[relatedInfo[1]]
                for (const prefix of prefixs) {
                    newStudent.Nickname.push(prefix + relatedItem!.Name)
                    for (const nickname of relatedItem!.Nickname)
                        newStudent.Nickname.push(prefix + nickname)
                }
            }
        }
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
            Avatar: ['/momotalk/Avatars/' + localItem.Nickname[0] + '.webp'],
            Bio: localItem.Bio[lng] ? localItem.Bio[lng] : localItem.Bio['en'],
            Nickname: localItem.Nickname,
            School: localItem.School ? localItem.School : '',
            cnt: 0
        }
        newStudent.Avatar = newStudent.Avatar.concat(localItem.Avatar)
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

export { getStudents, getMessage, getSchaleImg, getSchaleSchoolIcon }
