export default {
    selectInfo: '請選擇學生',
    imageUploadAlert: '不建議上傳大於1MB的圖片！',
    customRoleInfo: '輸入自訂角色名稱',
    storyEvent: '羈絆劇情',
    reply: '回覆',
    playerTitle: 'Momotalk 劇情播放器',
    playerContent: "點選 '確認' 開始播放學生 Momotalk 劇情\n💥注意：此功能將清空對話記錄",
    confirm: '確認',
    cancel: '取消',
    selectStory: '選擇劇集',
    selectLanguage: '選擇語言',
    setting: '⚙️ 設置',
    basicSetting: '基本設定',
    experimental: '實驗性功能',
    renderStyle: '主題風格',
    importAndExport: '導入/導出',
    importDialog: '導入對話',
    importButton: '選擇文件',
    exportDialog: '導出對話',
    exportButton: '點我下載',
    chatToArona: '與阿羅娜聊天',
    warnSave: '❗此功能需要清空當前對話，請先行保存',
    warnCost: '❗此功能會大量消耗 Token',
    host: '轉發 Host',
    clickToStart: '點擊下面的阿羅娜開始聊天',
    help: `
# 使用說明 · How to use

## 📚側邊欄 · Sidebar

側邊欄下方有三個按鈕分別是「**切換語言**」「**重設**」和「**下載**為圖片」

## 🎓學生列表 · Student List

- 搜尋欄（快捷鍵 \`/\`）：支援漢字、羅馬拼音，以及遊戲用語

- 搜尋欄右側按鈕：在「已實裝角色」和「未實裝角色」之間**切換列表** 

![](./img/switchlsit.webp)

- 學校標誌：篩選學校

- 帶有 \`+\` 標誌的學生頭像：點擊頭像切換 **差分**

![](./img/appearence.webp)

## 🖌️編輯介面 · Edit Container 

- 選擇身份：前四項「**老師**」「**羈絆劇情框**」「**回覆**」「**系統訊息**」，最後一個按鈕用於**添加自訂角色** 
- 老師/學生身份，點擊頭像可發送遊戲中的**聊天室貼圖**和**角色表情差分**

![](./img/stickers.webp)
![](./img/sendbar.webp)

透過類似 markdown 的語法可以發送一些特殊的文字樣式

| 語法 Usage | 描述 Description |
| ---- | ---- |
| \\# Heading level 1 | 一級標題  |
| \\#\\# Heading level 2 | 二級標題  |
| \\#\\#\\# Heading level 3 | 三級標題  |
| \\*\\*Bold text\\*\\* | 粗體 |
| \\*Italic text\\* | 斜體 |
| \\*\\*\\*Bold italic text\\*\\*\\* | 粗斜體 |
| \\~\\~Delete line\\~\\~ | 刪除線 |
| \\[color:red;font-size:10px](Font style) | 字體樣式 |

> 這個字體的粗體在某些瀏覽器上可能不能正確顯示

- **修改**：支援編輯 *文本*、*角色名字* 和 *圖片* 
- **選項**：輸入回車鍵會顯示下一個選項框
- **拖曳**：按住消息上下移動可以調整消息之間的順序
- **刪除**：當游標 *停留* 在元素上時，出現 \`x\` 刪除按鈕
- **插入**：當游標 *停留* 在元素上時，出現 \`↲\` 插入按鈕，之後發送消息會插入到此處
- **快速鍵**：撤銷 \`Ctrl+Z\`，重做 \`Ctrl+Shift+Z\`，軟換行 \`Ctrl+Shift+Enter\`

![](./img/edit.webp)

- 中斷訊息流：點擊學生訊息中“頭像”下方的區域。

![](./img/splitmessage.webp)

<p>由 <a href="https://twitter.com/YuzuTalkJP/status/1421448297030381569">Yuzutalk</a> 提供 </p>

## 其他

本應用適配移動端，但是因能力有限，基本上是瀏覽功能，更建議使用電腦 💻📱

如果發現有遺漏或錯誤，歡迎提 [issue](https://github.com/U1805/momotalk/issues) 或 [pr](https://github.com/U1805/momotalk/pulls) 補充，當然對功能和代碼的好想法和優化也歡迎提出 ❤️

![](./img/kyk.gif)
`
}
