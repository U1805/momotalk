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
    config: ProxyConfig | null = null

    @memorize
    async loadConfig() {
        let configUrl = '/api/Momotalk/imageDomain.json'
        configUrl = configUrl.replace('/api', 'https://BlueArcbox.github.io/resources')

        const response = await axios.get<ProxyConfig>(configUrl)
        this.config = response.data
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
        for (const [oldDomain, newDomain] of Object.entries(this.config.domain)) {
            if (url.startsWith(oldDomain)) {
                url = url.replace(oldDomain, newDomain)
            }
        }

        // 添加代理
        Object.keys(this.config?.proxy).forEach((targetDomain) => {
            if (url.indexOf(targetDomain) !== -1) {
                const proxyDomain = this.config?.proxy[targetDomain]['domain']
                const proxyParams = this.config?.proxy[targetDomain]['param']

                url = `${proxyDomain}${encodeURIComponent(url as string)}${proxyParams}`
            }
        })

        return url
    }

    @memorize
    async getData(file: string) {
        if (!this.config) {
            throw new Error('Config not loaded. Call loadConfig before using getData.')
        }
        const response = await axios.get(this.proxy(file))
        return response.data
    }

    @memorize
    getSchale() {
        if (!this.config) {
            throw new Error('Config not loaded. Call loadConfig before using getSchale.')
        }
        return this.config.schale
    }
}

const resourceInstance = new Resource()
await resourceInstance.loadConfig()
const getData = (file: string) => resourceInstance.getData(file)
const proxy = (url: string[]) => resourceInstance.proxy(url)
const schale_url = resourceInstance.getSchale()

/*
数据请求方法
*/
const getSchaleImg = (collection: string) => {
    return `${schale_url}/images/student/collection/${collection}.webp`
}

const getSchaleSchoolIcon = (school: string) => {
    return `${schale_url}/images/schoolicon/${school}.png`
}

const getMessage = async (storyid: string, story: string) => {
    return (await getData(`/api/Stories/${storyid}/${story}.json`)) as any[]
}

const getStickers = async (student: number) => {
    return (await getData(`/api/Stories/${student}/Stickers.json`)) as any[]
}

const getSchale = async (lng: string) => {
    const [local, schale, prefixTable] = await Promise.all([
        getData('/api/Momotalk/students.json'),
        getData(`${schale_url}/data/${lng}/students.min.json`),
        getData('/api/Momotalk/prefixTable.json')
    ])

    const orderedKeys = _getOrderedKeys(schale, local)

    return orderedKeys.map((key: string) => {
        const schaleItem = schale[key]
        const localItem = local.find((ele: any) => ele.Id === key)
        const newStudent = _createStudentObject(schaleItem, localItem, lng) as studentInfo

        // filling empty bio
        if (localItem && lng == 'en' && !localItem.Bio['en'])
            newStudent.Bio = localItem.Bio['jp']
        if (localItem && lng == 'tw' && !localItem.Bio['tw'])
            newStudent.Bio = Traditionalized(localItem.Bio['zh'])

        // fix zh name
        if (localItem && lng == 'zh' && localItem.Name) newStudent.Name = localItem.Name

        // generating nicknames: add prefix
        _generateNickname(newStudent, localItem, schale, local, prefixTable)

        return newStudent
    })
}

const _getOrderedKeys = (schale: { [key: string]: any }, local: any[]) => {
    const orderedIds = local.map((item: any) => item.Id)

    const localIdSet = new Set(orderedIds)
    const additionalIds = Object.values(schale)
        .filter((studentInfo) => !localIdSet.has(studentInfo.Id))
        .map((studentInfo) => studentInfo.Id)

    return [...orderedIds, ...additionalIds]
}

const _createStudentObject = (schaleItem: any, localItem: any, lng: string) => ({
    Id: schaleItem.Id,
    Name: schaleItem.Name,
    Birthday: schaleItem.Birthday,
    Avatars: proxy([getSchaleImg(schaleItem.Id), ...(localItem?.Avatar || [])]),
    Bio: localItem?.Bio[lng] || '',
    Nickname: [schaleItem.PathName, ...(localItem?.Nickname || [])],
    School: localItem?.School || schaleItem.School,
    cnt: 0
})

const _generateNickname = (
    student: studentInfo,
    localItem: any,
    schale: { [key: string]: any },
    local: any[],
    prefixTable: { [key: string]: string[] }
) => {
    if (localItem?.related && prefixTable[localItem.related[1]]) {
        const [relatedId, relationType] = localItem.related
        const relatedSchaleItem = schale[relatedId]
        const relatedLocalItem = local.find((ele: any) => ele.Id === relatedId)
        const nicknames = relatedLocalItem?.Nickname ? relatedLocalItem.Nickname : []
        const prefixes = prefixTable[relationType]
        for (const prefix of prefixes) {
            student.Nickname.push(
                prefix + relatedSchaleItem.Name,
                prefix + relatedSchaleItem.PathName,
                ...nicknames.map((nickname: string) => prefix + nickname)
            )
        }
    }
}

const getLocal = async (lng: string) => {
    const local = (await getData('/api/Momotalk/students2.json')) as any[]
    return local.map((localItem) => {
        return {
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
        } as studentInfo
    })
}

const getStudents = async (lng: string) => {
    const data1: studentInfo[] = await getSchale(lng)
    const data2: studentInfo[] = await getLocal(lng)
    return [data1, data2]
}

export { getStudents, getMessage, getSchaleImg, getSchaleSchoolIcon, getStickers, proxy }
