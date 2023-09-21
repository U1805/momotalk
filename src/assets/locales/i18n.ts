import { createI18n } from 'vue-i18n'

const messages = {
    zh: {
        selectInfo: '请选择学生',
        imageUploadAlert: '目前不建议上传大于 1MB 的图片哦！',
        customRoleInfo: '请输入自定义角色名',
        storyEvent: '羁绊剧情',
        reply: '回复',
        dialogTitle: "🎈这里是实验性功能",
        dialogContent: "点击 `确定` 开始播放学生 Momotalk 剧情\n💥注意：此功能会清空对话记录",
        confirm: "确定",
        cancel: "取消"
    },
    jp: {
        selectInfo: '生徒を選択してください',
        imageUploadAlert: '1MB以上の画像をアップロードすることはお勧めしません！',
        customRoleInfo: 'カスタムキャラクター名を入力してください',
        storyEvent: '絆イベント',
        reply: '返信する',
        dialogTitle: "🎈実験的な機能です",
        dialogContent: "確認ボタンを押して\n生徒の Momotalk イベントを再生します\n💥注意：会話履歴が削除されます",
        confirm: "確認",
        cancel: "キャンセル"
    }
}

const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n
