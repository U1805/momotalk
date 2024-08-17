import axios from 'axios'
import { studentInfo, ProxyConfig } from './interface'
import { Traditionalized } from './tw_cn'

/*
缓存请求结果
*/
function memorize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const cache = new Map()

    descriptor.value = function (...args: any[]) {
        const key = JSON.stringify(args)
        if (cache.has(key)) {
            return cache.get(key)
        }
        const result = originalMethod.apply(this, args)
        cache.set(key, result)
        return result
    }

    return descriptor
}

class Resource {
    private config: ProxyConfig | null = null

    @memorize
    async loadConfig() {
        let configUrl = '/api/Momotalk/proxyConfig.json'
        configUrl = configUrl.replace('/api', 'https://BlueArcbox.github.io/resources')

        const response = await axios.get<ProxyConfig>(configUrl)
        return response.data
    }

    proxy(url: string): string
    proxy(url: string[]): string[]

    @memorize
    proxy(url: string | string[]): string | string[] {
        if (!this.config) {
            throw new Error('Config not loaded. Call loadConfig before using proxy.')
        }

        if (Array.isArray(url)) {
            return url.map((u) => this.proxy(u) as string)
        }

        // 替换域名
        for (const [oldDomain, newDomain] of Object.entries(
            this.config.domainReplacements
        )) {
            if (url.startsWith(oldDomain)) {
                url = url.replace(oldDomain, newDomain)
            }
        }

        // 添加代理
        for (const [targetDomain, proxyDomain] of Object.entries(
            this.config.proxyDomains
        )) {
            if (url.indexOf(targetDomain) !== -1) {
                url = `${proxyDomain}${encodeURIComponent(url)}${this.config.proxyParams}`
            }
        }

        return url
    }

    @memorize
    async getData(file: string) {
        if (!this.config) {
            this.config = await this.loadConfig()
        }
        const response = await axios.get(this.proxy(file))
        return response.data
    }
}

const resourceInstance = new Resource()
const getData = (file: string) => resourceInstance.getData(file)
const proxy = (url: string[]) => resourceInstance.proxy(url)

/*
数据请求方法
*/
const getSchaleImg = (collection: string) => {
    return `https://schale.gg/images/student/collection/${collection}.webp`
}

const getSchaleSchoolIcon = (school: string) => {
    return `https://schale.gg/images/schoolicon/School_Icon_${school.toUpperCase()}_W.png`
}

const getMessage = async (storyid: string, story: string) => {
    const res = (await getData(`/api/Stories/${storyid}/${story}.json`)) as any[]
    return res
}

const getStickers = async (student: number) => {
    const res = (await getData(`/api/Stories/${student}/Stickers.json`)) as any[]
    return res
}

const getSchale = async (lng: string) => {
    const schale = (await getData(
        `https://schale.gg/data/${lng}/students.min.json`
    )) as any[]
    const local = (await getData('/api/Momotalk/students.json')) as any[]
    const prefixTable = (await getData('/api/Momotalk/prefixTable.json')) as {
        [key: string]: string[]
    }
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
        // fix zh name
        if (localItem && lng == 'zh' && localItem.Name) newStudent.Name = localItem.Name

        // generating nicknames: add prefix
        if (
            localItem &&
            localItem.related &&
            Object.prototype.hasOwnProperty.call(prefixTable, localItem.related[1])
        ) {
            const relatedInfo: [number, string] = localItem.related
            const relatedItem = results.find((ele) => ele.Id === relatedInfo[0])!
            const prefixs = prefixTable[relatedInfo[1]]
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
    const local = (await getData('/api/Momotalk/students2.json')) as any[]
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

export { getStudents, getMessage, getSchaleImg, getSchaleSchoolIcon, getStickers, proxy }
