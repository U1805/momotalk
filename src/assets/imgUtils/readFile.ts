import i18n from '@/locales/i18n'

const fileToDataURL = (file: Blob): Promise<any> => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = (e) => resolve((e.target as FileReader).result)
        reader.readAsDataURL(file)
    })
}
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = dataURL
    })
}
const canvastoFile = (
    canvas: HTMLCanvasElement,
    type: string,
    quality: number
): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
}

const compressionFile = async (file:File, quality = 0.5) => {
    const fileName = file.name
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const base64 = await fileToDataURL(file)
    const img = await dataURLToImage(base64)
    canvas.width = img.width
    canvas.height = img.height
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, img.width, img.height)
    const blob = (await canvastoFile(canvas, 'image/webp', quality)) as Blob
    const newFile = await new File([blob], fileName, { type: 'image/webp' })
    return newFile
}

const readFile = (reader: FileReader) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
        const file = input.files?.[0]
        if (file) {
            if (file.size > 1048576) {
                // 太大容易卡
                alert(i18n.global.t('imageUploadAlert'))
                return
            }
            if (file) {
                const webp = await compressionFile(file)
                reader.readAsDataURL(webp)
            }
        }
    }
    input.click()
}

export { readFile }
