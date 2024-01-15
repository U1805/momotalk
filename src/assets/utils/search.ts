import { studentInfo } from './interface'
import { Traditionalized } from './tw_cn'
import pinyin from 'tiny-pinyin'

const search = (data: studentInfo[], key: string, filter: string) => {
    // https://www.cnblogs.com/caozhenfei/p/14882122.html

    let reg_text = new RegExp(
        key
            .toLowerCase()
            .trim()
            .replaceAll('(', '\\(')
            .replaceAll(')', '\\)')
            .replaceAll('（', '\\(')
            .replaceAll('）', '\\)')
    )
    let reg_school = new RegExp(filter)

    return data.filter((item) => {
        if (reg_school.test(item.School)) {
            // 部分匹配，罗马音+昵称+名字
            if (reg_text.test(item.Name.toLowerCase())) return item
            for (let nickname of item.Nickname) {
                if (reg_text.test(nickname.toLowerCase())) return item
            }
            // 匹配繁体
            if (reg_text.test(Traditionalized(item.Name).toLowerCase())) return item
            for (let nickname of Traditionalized(item.Nickname)) {
                if (reg_text.test(nickname.toLowerCase())) return item
            }
            // 匹配拼音
            if (!pinyin.isSupported()) return false
            if (reg_text.test(pinyin.convertToPinyin(item.Name, '', true))) return item
            for (let nickname of item.Nickname) {
                if (reg_text.test(pinyin.convertToPinyin(nickname, '', true))) return item
            }
        }
    })
}

export { search }
