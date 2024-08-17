/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import type { DirectiveBinding } from 'vue'
import type { LazyOptions, ValueFormatterObject } from './types'
import { LifecycleEnum } from './types'
import { hasIntersectionObserver, isObject } from './util'
import { DEFAULT_ERROR, DEFAULT_LOADING } from './constant'

const DEFAULT_OBSERVER_OPTIONS = {
    rootMargin: '0px',
    threshold: 0
}

const TIMEOUT_ID_DATA_ATTR = 'data-lazy-timeout-id'

/**
 * Lazyload
 *
 * @export
 * @class Lazy
 */
export default class Lazy {
    public options: LazyOptions = {
        loading: DEFAULT_LOADING,
        error: DEFAULT_ERROR,
        observerOptions: DEFAULT_OBSERVER_OPTIONS
    }

    private _images: WeakMap<HTMLElement, IntersectionObserver> = new WeakMap()

    /**
     * mount
     *
     * @param {HTMLElement} el
     * @param {DirectiveBinding<string>} binding
     * @memberof Lazy
     */
    public mount(
        el: HTMLElement,
        binding: string | DirectiveBinding<string | ValueFormatterObject>
    ): void {
        if (!el) return
        const { src, loading, error, delay } = this._valueFormatter(
            typeof binding === 'string' ? binding : binding.value
        )
        this._lifecycle(LifecycleEnum.LOADING, el)
        el.setAttribute('src', loading || DEFAULT_LOADING)
        if (!hasIntersectionObserver) {
            this.loadImages(el, src, error)
        }
        this._initIntersectionObserver(el, src, error, delay)
    }

    /**
     * update
     *
     * @param {HTMLElement} el
     * @memberof Lazy
     */
    public update(
        el: HTMLElement,
        binding: string | DirectiveBinding<string | ValueFormatterObject>
    ): void {
        if (!el) return
        this._realObserver(el)?.unobserve(el)
        const { src, error, delay } = this._valueFormatter(
            typeof binding === 'string' ? binding : binding.value
        )
        this._initIntersectionObserver(el, src, error, delay)
    }

    /**
     * unmount
     *
     * @param {HTMLElement} el
     * @memberof Lazy
     */
    public unmount(el: HTMLElement): void {
        if (!el) return
        this._realObserver(el)?.unobserve(el)
        this._images.delete(el)
    }

    /**
     * force loading
     *
     * @param {HTMLElement} el
     * @param {string} src
     * @memberof Lazy
     */
    public loadImages(el: HTMLElement, src: string, error?: string): void {
        this._setImageSrc(el, src, error)
    }

    /**
     * 图片请求缓存
     *
     * @param {string} url
     * @memberof Lazy
     */
    private _imageCache = new Map<string, string>()
    private _pendingRequests = new Map<string, Promise<string>>()
    private _loadImage(url: string): Promise<string> {
        // 先检查缓存
        if (this._imageCache.has(url)) {
            return Promise.resolve(this._imageCache.get(url)!)
        }

        // 检查是否已有正在进行的请求
        if (this._pendingRequests.has(url)) {
            return this._pendingRequests.get(url)!
        }

        // 发起新的请求
        const request = fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const objectURL = URL.createObjectURL(blob)
                this._imageCache.set(url, objectURL)
                this._pendingRequests.delete(url) // 请求完成后删除
                return objectURL
            })

        // 缓存正在进行的请求
        this._pendingRequests.set(url, request)

        return request
    }

    /**
     * set img tag src
     *
     * @private
     * @param {HTMLElement} el
     * @param {string} src
     * @memberof Lazy
     */
    private _setImageSrc(el: HTMLElement, src: string, error?: string): void {
        if (el.tagName.toLowerCase() === 'img') {
            if (src) {
                const preSrc = el.getAttribute('src')
                if (preSrc !== src)
                    this._loadImage(src).then((src) => {
                        el.setAttribute('src', src)
                    })
            }
            this._listenImageStatus(
                el as HTMLImageElement,
                () => {
                    this._lifecycle(LifecycleEnum.LOADED, el)
                },
                () => {
                    // Fix onload trigger twice, clear onload event
                    // Reload on update
                    el.onload = null
                    this._lifecycle(LifecycleEnum.ERROR, el)
                    this._realObserver(el)?.disconnect()
                    if (error) {
                        const newImageSrc = el.getAttribute('src')
                        if (newImageSrc !== error) el.setAttribute('src', error)
                    }
                }
            )
        } else {
            el.style.backgroundImage = `url('${src}')`
        }
    }

    /**
     * init IntersectionObserver
     *
     * @private
     * @param {HTMLElement} el
     * @param {string} src
     * @memberof Lazy
     */
    private _initIntersectionObserver(
        el: HTMLElement,
        src: string,
        error?: string,
        delay?: number
    ): void {
        const observerOptions = this.options.observerOptions
        this._images.set(
            el,
            new IntersectionObserver((entries) => {
                Array.prototype.forEach.call(entries, (entry) => {
                    if (delay && delay > 0)
                        this._delayedIntersectionCallback(el, entry, delay, src, error)
                    else this._intersectionCallback(el, entry, src, error)
                })
            }, observerOptions)
        )
        this._realObserver(el)?.observe(el)
    }

    private _intersectionCallback(
        el: HTMLElement,
        entry: IntersectionObserverEntry,
        src: string,
        error?: string
    ): void {
        if (entry.isIntersecting) {
            this._realObserver(el)?.unobserve(entry.target)
            this._setImageSrc(el, src, error)
        }
    }

    private _delayedIntersectionCallback(
        el: HTMLElement,
        entry: IntersectionObserverEntry,
        delay: number,
        src: string,
        error?: string
    ): void {
        if (entry.isIntersecting) {
            if (entry.target.hasAttribute(TIMEOUT_ID_DATA_ATTR)) return

            const timeoutId = setTimeout(() => {
                this._intersectionCallback(el, entry, src, error)
                entry.target.removeAttribute(TIMEOUT_ID_DATA_ATTR)
            }, delay)
            entry.target.setAttribute(TIMEOUT_ID_DATA_ATTR, String(timeoutId))
        } else {
            if (entry.target.hasAttribute(TIMEOUT_ID_DATA_ATTR)) {
                clearTimeout(Number(entry.target.getAttribute(TIMEOUT_ID_DATA_ATTR)))
                entry.target.removeAttribute(TIMEOUT_ID_DATA_ATTR)
            }
        }
    }

    /**
     * only listen to image status
     *
     * @private
     * @param {string} src
     * @param {(string | null)} cors
     * @param {() => void} success
     * @param {() => void} error
     * @memberof Lazy
     */
    private _listenImageStatus(
        image: HTMLImageElement,
        success: ((this: GlobalEventHandlers, ev: Event) => any) | null,
        error: OnErrorEventHandler
    ) {
        image.onload = success
        image.onerror = error
    }

    /**
     * to do it differently for object and string
     *
     * @public
     * @param {(ValueFormatterObject | string)} value
     * @returns {*}
     * @memberof Lazy
     */
    public _valueFormatter(value: ValueFormatterObject | string): ValueFormatterObject {
        let src = value as string
        let loading = this.options.loading
        let error = this.options.error
        let delay = this.options.delay
        if (isObject(value)) {
            src = (value as ValueFormatterObject).src
            loading = (value as ValueFormatterObject).loading || this.options.loading
            error = (value as ValueFormatterObject).error || this.options.error
            delay = (value as ValueFormatterObject).delay || this.options.delay
        }
        return {
            src,
            loading,
            error,
            delay
        }
    }

    /**
     * lifecycle easy
     *
     * @private
     * @param {LifecycleEnum} life
     * @param {Lifecycle} [lifecycle]
     * @memberof Lazy
     */
    private _lifecycle(life: LifecycleEnum, el?: HTMLElement): void {
        switch (life) {
            case LifecycleEnum.LOADING:
                el?.setAttribute('lazy', LifecycleEnum.LOADING)
                break
            case LifecycleEnum.LOADED:
                el?.setAttribute('lazy', LifecycleEnum.LOADED)
                break
            case LifecycleEnum.ERROR:
                el?.setAttribute('lazy', LifecycleEnum.ERROR)
                break
            default:
                break
        }
    }

    private _realObserver(el: HTMLElement): IntersectionObserver | undefined {
        return this._images.get(el)
    }
}
