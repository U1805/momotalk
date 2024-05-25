import { domtoimage } from './dom-to-image'
import i18n from '@/locales/i18n'

const download = () => {
    // 检查浏览器缩放，缩放可能导致文字溢出 Check browser zoom, which may cause the last overflow
    if (window.outerWidth / window.innerWidth !== 1){
        const ans = confirm(i18n.global.t('warnZoom'))
        if (!ans) return
    }
    const node = document.getElementsByClassName('talk-list')[0]
    const indicators = document.getElementsByClassName('insert-indicator')
    const indicator = indicators.length>0 ? indicators[0] : document.createElement("div")
    // 隐藏截图的滚动条 Hide scrollbar when download image
    node.setAttribute('style', 'overflow-y:hidden')
    indicator.setAttribute('style', 'display:none')

    const width = node.clientWidth
    const height = node.scrollHeight
    if (width && height) {
        domtoimage
            .toPng(node, { width, height })
            .then(function (dataUrl: string) {
                const link = document.createElement('a')
                link.download = `Momotalk-${Date.now()}.png`
                link.href = dataUrl
                link.click()
            })
            .catch(function (error: Error) {
                console.error('oops, screenshot went wrong!', error)
            })
            .finally(function () {
                // 恢复滚动功能 Restore scrollbar
                node.setAttribute('style', 'overflow-y:scroll')
                indicator.setAttribute('style', '')
            })
    }
}

export { download }
