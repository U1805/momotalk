import i18n from '@/locales/i18n'

const readFile = (reader: FileReader) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
        const file = input.files?.[0]
        if (file) {
            if (file.size > 1048576) {
                // 太大容易卡
                alert(i18n.global.t('imageUploadAlert'))
                return
            }
            if (file) {
                reader.readAsDataURL(file)
            }
        }
    }
    input.click()
}

export { readFile }
