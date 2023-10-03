import axios from 'axios'
import { myStudent } from './interface'

const getSchaleImg = (collection: string) => {
    return `https://schale.gg/images/student/collection/${collection}.webp`
}

const getData = async (file: string) => {
    let data: any[] = []
    await axios.get(file).then((res) => (data = res.data))
    return data
}

const getSchale = async (lng: string) => {
    const local = await getData('/momotalk/students.min.json')
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
                const relatedInfo:[number, string[]] = localItem.related
                const relatedItem = results.find((ele) => ele.Id === relatedInfo[0])
                for (let prefix of relatedInfo[1]){
                    newStudent.Nickname.push(prefix+relatedItem!.Name)
                    for (let nickname of relatedItem!.Nickname)
                        newStudent.Nickname.push(prefix+nickname)
                }
            }
        }
        results.push(newStudent)
    }
    return results
}

const getLocal = async (lng: string) => {
    const local = await getData('/momotalk/students2.min.json')
    const results: myStudent[] = []
    for (const localItem of local) {
        const newStudent: myStudent = {
            Id: localItem.Id,
            Name: localItem.Name[lng]?localItem.Name[lng]:"",
            Birthday: '???',
            Avatar: ['/momotalk/Avatars/' + localItem.Nickname[0] + '.webp'],
            Bio: localItem.Bio[lng]?localItem.Bio[lng]:"",
            Nickname: localItem.Nickname,
            School: '',
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

const getMessage = async (story:string) => {
    const res = await getData(`/momotalk/Stories/${story}.json`)
    return res
}

export { getStudents, getMessage }
