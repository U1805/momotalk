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
        cancel: "取消",
        selectStory: "选择剧情",
        selectLanguage: "选择语言"
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
        cancel: "キャンセル",
        selectStory: "イベントを選択",
        selectLanguage: "言語を選択"
    },
    en: {
        selectInfo: 'Please select a student',
        imageUploadAlert: 'It is not recommended to upload images larger than 1MB!',
        customRoleInfo: 'Enter a custom character name',
        storyEvent: 'Story Event',
        reply: 'Reply',
        dialogTitle: "🎈Experimental Feature",
        dialogContent: "Click 'Confirm' to start playing the student Momotalk event\n💥Note: This will clear the conversation history",
        confirm: "Confirm",
        cancel: "Cancel",
        selectStory: "Select an episode",
        selectLanguage: "Select a language"
    },
    tw: {
        selectInfo: '請選擇學生',
        imageUploadAlert: '不建議上傳大於1MB的圖片！',
        customRoleInfo: '輸入自訂角色名稱',
        storyEvent: '羈絆劇情',
        reply: '回覆',
        dialogTitle: "🎈這是實驗性功能",
        dialogContent: "點選 '確認' 開始播放學生 Momotalk 劇情\n💥注意：此功能將清空對話記錄",
        confirm: "確認",
        cancel: "取消",
        selectStory: "選擇劇集",
        selectLanguage: "選擇語言"
    }
}

const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n
