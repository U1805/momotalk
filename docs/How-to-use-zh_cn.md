![banner](./assets/演示2.webp)

# 食用说明

## 📚 侧边栏

💾 侧边栏下方三个按钮分别是「**切换语言**」「**重置**」和「**下载**为图片」

## 🎓学生列表

🔍 点击右侧的**学校标志**，筛选学校；上方的**搜索栏**（快捷键 `/`），支持汉字、罗马音，以及游戏黑话(角色别名)

📜 搜索栏右侧的按钮：在「已实装角色」和「未实装角色」之间**切换列表** 

<p align="center">
<img src="../public/img/switchlsit.webp" alt="switch_list" style="width:50%">
</p>

🔄 头像标着 `+` 的学生：点击头像切换 **差分** 

<p align="center">
<img src="../public/img/appearence.webp" alt="appearence" style="width:50%">
</p>

📝 进入编辑界面后，点选学生列表可以将学生加入右下角的候选列表，方便后续使用 

## 🖌️ 编辑界面

在编辑界面，下方分别是「发送栏」和「候选列表」 

### 🎭 选择身份

候选列表前四项为「**老师**」「**羁绊剧情**」「**回复**」「**系统消息**」，最后一个按钮用于**添加自定义角色** 

<p align="center">
<img src="../public/img/sendbar.webp" alt="sendbar" style="width:50%">
</p>

### 🌄 发送消息

选择身份后在发送栏**发送消息或图片**（大小限制为 1MB）

老师和学生身份，点击发送栏的头像能够发送游戏中的聊天室**贴图**。此外，这里也可以选择角色的表情差分图片。

<p align="center">
<img src="../public/img/stickers.webp" alt="stickers" style="width:45%">
<img src="../public/img/stickers2.webp" alt="face variations" style="width:45%">
</p>

### ✏️ 编辑消息

你可以通过类似 [markdown](https://markdown.com.cn/basic-syntax/) 的语法发送一些**特殊的文字样式**

发送一段试试吧「`# 一个很大的文字`」~

| 语法 | 
| ---- | 
| \# 一级标题 | 
| \#\# 二级标题 | 
| \#\#\# 三级标题 | 
| \*\*粗体\*\* | 
| \*斜体\* | 
| \*\*\*粗斜体\*\*\* | 
| \~\~删除线\~\~ | 
| \[color:red;font-size:10px](字体样式) | 

> 粗体在某些浏览器上可能无法正常显示
>
> 可以通过使用反斜杠字符 `\` 从而达到转义目的（`#` `*` `~`）。例如：`\#` 可以输出 # 而不变为标题

遵循 **所见即所得** 的设计思想，消息发送后仍可以对元素直接编辑，如修改、拖拽、删除等 

- **修改**：
  - 点选 *文本* 或者 *角色名字* 会出现文本框，在其中编辑即可
  - 对于 *图片* 消息，点击后重新上传图片
  - *回复* 键入回车会出现下一个选项框
- **拖拽**：按住消息上下移动可以调整消息之间的顺序
- **删除**：光标 *停留* 在元素上时，出现 `x` 删除按钮
- **插入**：光标 *停留* 在元素上时，出现 `↲` 插入按钮，之后发送消息会插入到此处
- **快捷键**：撤销 `Ctrl+Z`，重做 `Ctrl+Shift+Z`, 软换行 `Shift+Enter`

<p align="center">
<img src="../public/img/edit.webp" alt="edit" style="width:50%">
</p>

### 📜 中断消息流

通常单个学生的消息是连续的。如果想要中断消息流，可以尝试点击学生消息中“头像”下方的区域。

<div align="center">
<img src="../public/img/splitmessage.webp" alt="split" style="width:50%">

<p>via <a href="https://twitter.com/YuzuTalkJP/status/1421448297030381569">Yuzutalk</a> </p>
</div>

## ⚙️ 设置界面

点击右上角的齿轮图标进行设置操作，支持切换为 yuzutalk **主题**、**全屏**显示和对话的**导入导出**  

实验性功能中还有导出为**分享文件**，他人使用这个文件能够以动画播放的形式观看你的故事。**与阿罗娜聊聊天**的功能请自行准备 openai-api。

<p align="center">
<img src="./assets/setting.webp" alt="setting" style="width:50%">
</p>

## 🌟 其他

本应用适配移动端，但是因为能力有限，基本就是看看得了的程度，更推荐电脑操作 💻📱

游戏黑话(角色别名)搜索也是，如果发现有遗漏或者写错的，**欢迎提 [issue](https://github.com/U1805/momotalk/issues) 或 [pr](https://github.com/U1805/momotalk/pulls) 补充**，当然对功能和代码的好想法和优化也欢迎欢迎 ❤️

![thanks](../public/img/kyk.gif)