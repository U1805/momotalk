import { studentInfo } from '../requestUtils/interface'
import { Traditionalized } from './tw_cn'
import pinyin from 'tiny-pinyin'
// 缓存处理过的字符串
const processedCache = new Map<string, string>()

// 预处理字符串,移除符号并转小写
const processString = (str: string): string => {
    if (!str) return ''
    if (!processedCache.has(str)) {
        processedCache.set(str, str.toLowerCase().trim().replace(/[\(\)（）\[\]「」『』∗*＊【】_-\s]/g, ''))
    }
    return processedCache.get(str)!
}

const search = (data: studentInfo[], key: string, filter: string) => {
    const processedKey = processString(key)
    const processedFilter = processString(filter)
    if (!processedKey && !processedFilter) return data
    
    return data.filter(item => {
        if (!processedKey) return processString(item.School).includes(processedFilter)

        // 检查名字(简体、繁体、拼音)
        const name = processString(item.Name)
        if (name.includes(processedKey) || 
            processString(Traditionalized(item.Name)).includes(processedKey) ||
            (pinyin.isSupported() && pinyin.convertToPinyin(name, '', true).includes(processedKey))) {
            return true
        }

        // 检查昵称(简体、繁体)
        return item.Nickname.some(nick => {
            const processedNick = processString(nick)
            return processedNick.includes(processedKey) || 
                   processString(Traditionalized(nick)).includes(processedKey)
        })
    })
}

// 防抖
const debounce = (func: Function, delay: number) => {
    let timer: any = null
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    }
}

export { search, debounce }
