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

const getSchale = async () => {
    const local = await getData('/momotalk/students.json')
    const schale = await getData(
        'https://fastly.jsdelivr.net/gh/lonqie/SchaleDB@main/data/cn/students.min.json'
    )
    const results: myStudent[] = []
    for (const schaleItem of schale) {
        const newStudent: myStudent = {
            Id: schaleItem.Id,
            Name: schaleItem.Name,
            Birthday: schaleItem.Birthday,
            Avatar: [getSchaleImg(schaleItem.CollectionTexture)],
            Bio: '',
            Nickname: [schaleItem.PathName],
            cnt: 0
        }
        const localItem = local.find((ele) => ele.Id === newStudent.Id)
        if (localItem) {
            newStudent.Avatar = newStudent.Avatar.concat(localItem.Avatar)
            newStudent.Bio = localItem.Bio
            newStudent.Nickname = newStudent.Nickname.concat(localItem.Nickname)
        }
        results.push(newStudent)
    }
    return results
}

const getStudents = async () => {
    const data1: myStudent[] = await getSchale()
    const data2: myStudent[] = await getData('/momotalk/students2.json')
    return [data1, data2]
}

export { getStudents }
