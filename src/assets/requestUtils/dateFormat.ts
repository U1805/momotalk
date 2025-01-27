
const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

export type SupportedLanguage = 'zh' | 'tw' | 'jp' | 'kr' | 'en'

const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
    }
}

export const dateFormat = (birthday: string, lng: SupportedLanguage) => {
    if (!birthday || !/^\d+\/\d+$/.test(birthday)) return '???'
    const TOOL = {
        zh: (month: number, day: number) => `${month}月${day}日`,
        tw: (month: number, day: number) => `${month}月${day}日`,
        jp: (month: number, day: number) => `${month}月${day}日`,
        kr: (month: number, day: number) => `${month}월 ${day}일`,
        en: (month: number, day: number) =>
            `${MONTHS_EN[month - 1]} ${day}${getOrdinalSuffix(day)}`
    }
    const [month, day] = birthday.split('/').map(Number)
    return TOOL[lng](month, day)
}

export const dateFormatReverse = (date: string, lng: SupportedLanguage): string => {
    if (!date) return ''

    const parseDate = {
        zh: (str: string) => {
            const nums = str.match(/\d+/g)?.map(Number)
            return nums?.length === 2 ? nums : null
        },
        tw: (str: string) => parseDate.zh(str),
        jp: (str: string) => parseDate.zh(str),
        kr: (str: string) => parseDate.zh(str),
        en: (str: string) => {
            const monthName = MONTHS_EN.find(m => str.toLowerCase().includes(m.toLowerCase()))
            if (!monthName) return null
            const month = MONTHS_EN.indexOf(monthName) + 1
            const day = parseInt(str.match(/\d+/)?.[0] || '')
            return [month, day]
        }
    }

    const [month, day] = parseDate[lng](date) || []

    if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
        return ''
    }

    return `${month}/${day}`
}

export const birthday_sort = (a: any, b: any, lng: SupportedLanguage) => {
    // 将 MM/DD 格式转换为今年的日期以进行比较
    const today = new Date()
    const currentYear = today.getFullYear()
    
    const getDateFromBirthday = (birthday: string) => {
        birthday = dateFormatReverse(birthday, lng)
        if (!birthday) {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            return yesterday
        }
        const [month, day] = birthday.split('/').map(Number)
        return new Date(currentYear, month - 1, day - 1)
    }

    const aDate = getDateFromBirthday(a.Birthday)
    const bDate = getDateFromBirthday(b.Birthday)
    
    // 如果日期已经过了，使用明年的日期
    if (aDate < today) aDate.setFullYear(currentYear + 1)
    if (bDate < today) bDate.setFullYear(currentYear + 1)

    return aDate.getTime() - bDate.getTime()
}