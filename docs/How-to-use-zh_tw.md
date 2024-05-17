![banner](./assets/演示2.webp)

# 使用說明

## 📚 側邊欄

💾 側邊欄下方三個按鈕分別是「**切換語言**」「**重置**」和「**下載**為圖片」

## 🎓學生列表

🔍 點擊右側的**學校標誌**，篩選學校；上方的**搜尋欄**（快捷鍵 `/`），支援漢字、羅馬拼音，以及遊戲黑話(角色别名)

📜 搜尋欄右側的按鈕：在「已實裝角色」和「未實裝角色」之間**切換列表**

<p align="center">
<img src="../public/img/switchlsit.webp" alt="switch_list" style="width:50%">
</p>

🔄 頭像標著 `+` 的學生：點擊頭像切換 **差分**

<p align="center">
<img src="../public/img/appearence.webp" alt="appearence" style="width:50%">
</p>

📝 進入編輯介面後，點選學生列表可以將學生加入右下角的候選列表，方便後續使用

## 🖌️ 編輯介面

在編輯介面，下方分別是「發送欄」和「候選列表」

### 🎭 選擇身份

候選列表前四項為「**老師**」「**羈絆劇情**」「**回覆**」「**系統消息**」，最後一個按鈕用於**添加自定義角色**

<p align="center">
<img src="../public/img/sendbar.webp" alt="sendbar" style="width:50%">
</p>

### 🌄 發送消息

選擇身份後在發送欄**發送消息或圖片**（大小限制為 1MB）

老師和學生身份，點擊發送欄的頭像能夠發送遊戲中的聊天室**貼圖**。此外，這裡也可以選擇角色的表情差分圖片。

<p align="center">
<img src="../public/img/stickers.webp" alt="stickers" style="width:45%">
<img src="../public/img/stickers2.webp" alt="face variations" style="width:45%">
</p>

### ✏️ 編輯消息

你可以通過類似 [markdown](https://markdown.com.cn/basic-syntax/) 的語法發送一些**特殊的文字樣式**

發送一段試試吧「`# 一個很大的文字`」~

| 語法 |
| ---- |
| \# 一級標題 |
| \#\# 二級標題 |
| \#\#\# 三級標題 |
| \*\*粗體\*\* |
| \*斜體\* |
| \*\*\*粗斜體\*\*\* |
| \~\~刪除線\~\~ |
| \[color:red;font-size:10px](字體樣式) |

> 粗體在某些瀏覽器上可能無法正常顯示
>
> 可以通過使用反斜杠字符 `\` 從而達到轉義目的（`#` `*` `~`）。例如：`\#` 可以輸出 # 而不變為標題

遵循 **所見即所得** 的設計思想，消息發送後仍可以對元素直接編輯，如修改、拖曳、刪除等 

- **修改**：
  - 點選 *文字* 或者 *角色名稱* 會出現文字框，在其中編輯即可
  - 對於 *圖片* 消息，點擊後重新上傳圖片
  - *回覆* 鍵入回車會出現下一個選項框
- **拖曳**：按住消息上下移動可以調整消息之間的順序
- **刪除**：游標 *停留* 在元素上時，出現 `x` 刪除按鈕
- **插入**：游標 *停留* 在元素上時，出現 `↲` 插入按鈕，之後發送消息會插入到此處
- **快捷鍵**：撤銷 `Ctrl+Z`，重做 `Ctrl+Shift+Z`，軟換行 `Shift+Enter`

<p align="center">
<img src="../public/img/edit.webp" alt="edit" style="width:50%">
</p>

### 📜 中斷消息流

通常單個學生的消息是連續的。如果想要中斷消息流，可以嘗試點擊學生消息中“頭像”下方的區域。

<div align="center">
<img src="../public/img/splitmessage.webp" alt="split" style="width:50%">

<p>via <a href="https://twitter.com/YuzuTalkJP/status/1421448297030381569">Yuzutalk</a> </p>
</div>


## ⚙️ 設置介面

點擊右上角的齒輪圖標進行設置操作，支援切換為 yuzutalk **主題**、**全屏**顯示和對話的**匯出匯入**  

實驗性功能中還有匯出為**分享文件**，他人使用這個文件能夠以動畫播放的形式觀看你的故事。**和阿罗娜聊聊天**的功能請自行準備 openai-api。

<p align="center">
<img src="./assets/setting.webp" alt="setting" style="width:50%">
</p>

## 🌟 其他

本應用適配移動端 💻📱

如果遊戲黑話(角色别名)搜索發現有遺漏或者寫錯的，**歡迎提 [issue](https://github.com/U1805/momotalk/issues) 或 [pr](https://github.com/U1805/momotalk/pulls) 補充**，當然對功能和代碼的好想法和優化也歡迎歡迎 ❤️

![thanks](../public/img/kyk.gif)