
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
    if (!birthday) return '???'
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
