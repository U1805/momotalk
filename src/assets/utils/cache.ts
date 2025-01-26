import axios from 'axios'
import { ProxyConfig } from './interface'

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

export class Resource {
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
}