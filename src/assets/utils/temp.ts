import { myStudent } from "./interface"

function getTestRole(){
    var student: myStudent = {
        Id: 10010,
        Name: "Shiroko",
        Avatar: ["https://schale.gg/images/student/collection/10010.webp"],
        Birthday: '',
        Bio: '',
        Nickname: [''],
        School: '',
        cnt: 0
    }
    return student
}

export { getTestRole }