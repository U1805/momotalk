export default {
    selectInfo: '请选择学生',
    imageUploadAlert: '目前不建议上传大于 1MB 的图片哦！',
    customRoleInfo: '请输入自定义角色名',
    storyEvent: '羁绊剧情',
    reply: '回复',
    playerTitle: 'Momotalk 剧情播放器',
    playerContent: '点击 `确定` 开始播放学生 Momotalk 剧情\n💥注意：此功能会清空对话记录',
    confirm: '确定',
    cancel: '取消',
    selectStory: '选择剧情',
    selectLanguage: '选择语言',
    setting: '⚙️ 设置',
    basicSetting: '基本设置',
    experimental: '实验性功能',
    renderStyle: '主题样式',
    fullScreen: '全屏',
    draggable: '对话拖拽',
    disableDrag: '禁用拖拽',
    importAndExport: '导入/导出',
    importDialog: '导入对话',
    importButton: '选择文件',
    exportDialog: '导出对话',
    exportButton: '点我下载',
    sharedFile: '分享文件',
    chatToArona: '与阿罗娜聊天',
    warnSave: '实验功能需要清空当前对话，请先行保存',
    warnCost: '❗此功能会大量消耗 Token',
    host: '转发 Host',
    clickToStart: '点击下面的阿罗娜开始聊天',
    help: `
# 食用说明 · How to use 

## 📚侧边栏 · Sidebar 

侧边栏下方三个按钮分别是「**切换语言**」「**重置**」和「**下载**为图片」

## 🎓学生列表 · Student List 

- 搜索栏（快捷键 \`/\`）：支持汉字、罗马音，以及游戏黑话 

- 搜索栏右侧按钮：「已实装角色」和「未实装角色」之间**切换列表** 

![](./img/switchlsit.webp)

- 学校标志：筛选学校

- 头像标着 \`+\` 的学生：点击头像进行切换 **差分**

![](./img/appearence.webp)

## 🖌️编辑界面 · Edit Container 

- 选择身份：前四项「**老师**」「**羁绊剧情框**」「**回复**」「**系统消息**」，最后一个按钮用于**添加自定义角色** 
- 老师/学生身份，点击头像能发送游戏中的**聊天室贴图**和**角色表情差分**
- 通过[类似 markdown 的语法](https://github.com/U1805/momotalk/blob/main/docs/How-to-use.md#%EF%B8%8F-%E7%BC%96%E8%BE%91%E6%B6%88%E6%81%AF--edit-messages)可以发送一些特殊的文字样式

![](./img/stickers.webp)
![](./img/sendbar.webp)

- **修改**：支持编辑 *文本* , *角色名字* 和 *图片* 
- **选项**：键入回车会出现下一个选项框
- **拖拽**：按住消息上下移动可以调整消息之间的顺序
- **删除**：当光标 *停留* 在元素上时，出现 \`x\` 删除按钮
- **插入**：当光标 *停留* 在元素上时，出现 \`↲\` 插入按钮，之后发送消息会插入到此处
- **快捷键**：撤销 \`Ctrl+Z\`，重做 \`Ctrl+Shift+Z\`，软换行 \`Ctrl+Shift+Enter\`

![](./img/edit.webp)

- 中断消息流：点击学生消息中“头像”下方的区域。

![](./img/splitmessage.webp)

<p style='text-align: center'>via <a href="https://twitter.com/YuzuTalkJP/status/1421448297030381569">Yuzutalk</a> </p>

## 🌟 其他

本应用适配移动端 💻📱

如果发现游戏黑话搜索有遗漏或者写错的，**欢迎提 [issue](https://github.com/U1805/momotalk/issues) 或 [pr](https://github.com/U1805/momotalk/pulls) 补充**，当然对功能和代码的好想法和优化也欢迎欢迎 ❤️

![](./img/kyk.gif)
`
}
