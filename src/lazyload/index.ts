import type { App } from 'vue'
import Lazy from './lazy'

// https://github.com/murongg/vue3-lazyload/tree/main

export default {
  /**
   * install plugin
   *
   * @param {App} Vue
   */
  install(Vue: App): void {
    const lazy = new Lazy()

    Vue.config.globalProperties.$Lazyload = lazy
    Vue.provide('Lazyload', lazy)
    Vue.directive('lazy', {
      mounted: lazy.mount.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.unmount.bind(lazy),
    })
  },
}
