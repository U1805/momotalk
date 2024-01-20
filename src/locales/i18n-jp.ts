export default {
    selectInfo: '生徒を選択してください',
    imageUploadAlert: '1MB以上の画像をアップロードすることはお勧めしません！',
    customRoleInfo: 'カスタムキャラクター名を入力してください',
    storyEvent: '絆イベント',
    reply: '返信する',
    playerTitle: 'Momotalk ストーリー',
    playerContent:
        '確認ボタンを押して\n生徒の Momotalk イベントを再生します\n💥注意：会話履歴が削除されます',
    confirm: '確認',
    cancel: 'キャンセル',
    selectStory: 'イベントを選択',
    selectLanguage: '言語を選択',
    setting: '⚙️ 設定',
    basicSetting: '基本設定',
    experimental: '実験的な機能です',
    renderStyle: 'テーマスタイル',
    draggable: '会話ドラッグ',
    disableDrag: 'ドラッグを無効にする',
    importAndExport: 'インポート/エクスポート',
    importDialog: '対話のインポート',
    importButton: 'ファイルを選択',
    exportDialog: '対話のエクスポート',
    exportButton: 'ダウンロード',
    chatToArona: 'アロナとチャット',
    warnSave: '❗この機能を使用するには、現在の対話を保存してください',
    warnCost: '❗この機能は大量の Token を消費します',
    host: 'ホストを転送',
    clickToStart: '下のアロナをクリックしてチャットを開始',
    help: `
# 使用方法 · How to use

## 📚サイドバー · Sidebar

サイドバーの下には「**言語切替**」「**リセット**」「**画像でダウンロード**」の3つのボタンがあります。

## 🎓生徒リスト · Student List

- 検索バー（ショートカットキー \`/\`）：**片仮名とローマ字**をサポートしています。

- 検索バーの右側のボタン：「実装済みキャラクター」と「未実装キャラクター」のリストを切り替えます。

![](./img/switchlsit.webp)

- 学校のロゴ：学校を絞り込みます。

- 「+」印のついた生徒のアイコン：クリックして**差分**を切り替えます。

![](./img/appearence.webp)

## 🖌️編集 · Edit Container

- 役割の選択：最初の4つのアイテム「**先生**」「**絆イベント**」「**返信**」「**システムメッセージ**」および最後のボタンは**カスタムキャラクターの追加**に使用されます。
- 先生/生徒の役割は、アイコンをクリックしてゲーム内のチャットルーム**ステッカー**と**生徒差分**を送信できます。
- [Markdownのような構文](https://github.com/U1805/momotalk/blob/main/docs/How-to-use.md#%EF%B8%8F-%E7%BC%96%E8%BE%91%E6%B6%88%E6%81%AF--edit-messages)を使用して、特殊なテキストスタイルを送信できます。

![](./img/stickers.webp)
![](./img/sendbar.webp)

- **編集**：*テキスト*、*キャラクター名*、*画像* の編集をサポートしています。
- **オプション**：Enterキーを押すと、次のオプションボックスが表示されます。
- **ドラッグアンドドロップ**：メッセージを上下にドラッグしてメッセージの順序を調整できます。
- **削除**：カーソルを要素上に置いたときに「x」の削除ボタンが表示されます。
- **挿入**：カーソルを要素上に置いたときに「↲」の削除ボタンが表示され、送信メッセージがここに挿入されます。 
- **ショートカットキー**：元に戻す \`Ctrl+Z\`、やり直し \`Ctrl+Shift+Z\`、ソフト改行 \`Ctrl+Shift+Enter\`

![](./img/edit.webp)

- メッセージフローの中断：生徒メッセージの下にある「アイコン」の下部をクリックします。

![](./img/splitmessage.webp)

<p style='text-align: center'>via <a href="https://twitter.com/YuzuTalkJP/status/1421448297030381569">Yuzutalk</a> </p>

## 🌟その他

このアプリはモバイルにも対応していますが、個人の能力の限界から、基本的にはコンピュータでの操作をお勧めします 💻📱

機能やコードの改善に関するアイデアや提案は、**[issue](https://github.com/U1805/momotalk/issues)** または **[pr](https://github.com/U1805/momotalk/pulls)** を提供していただければ幸いです ❤️

![](./img/kyk.gif)
`
}
