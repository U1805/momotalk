import { createI18n } from 'vue-i18n'

const messages = {
    zh: {
        selectInfo: '请选择学生',
        imageUploadAlert: '目前不建议上传大于 1MB 的图片哦！',
        customRoleInfo: '请输入自定义角色名',
        storyEvent: '羁绊剧情',
        reply: '回复'
    },
    jp: {
        selectInfo: '生徒を選択してください',
        imageUploadAlert: '1MB以上の画像をアップロードすることはお勧めしません！',
        customRoleInfo: 'カスタムキャラクター名を入力してください',
        storyEvent: '絆イベント',
        reply: '返信する'
    }
}

const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n
