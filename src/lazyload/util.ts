/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const inBrowser = typeof window !== 'undefined' && window !== null

export const hasIntersectionObserver = checkIntersectionObserver()

/**
 * is object
 *
 * @param {*} val
 * @returns {boolean}
 */
export function isObject(val: any): boolean {
  return typeof val === 'function' || toString.call(val) === '[object Object]'
}

/**
 * Check if IntersectionObserver can be used
 *
 * @returns {boolean}
 */
export function checkIntersectionObserver(): boolean {
  if (inBrowser
    && 'IntersectionObserver' in window
    && 'IntersectionObserverEntry' in window
    && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype,
        'isIntersecting', {
          get() {
            return this.intersectionRatio > 0
          },
        })
    }
    return true
  }
  return false
}