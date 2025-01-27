# MomoTalk Editor

## Update log 更新历史

## Jan 26, 2025:

重构：移除 SchaleDB 相关依赖  
功能：增加相关学生跳转功能

refactor: Remove SchaleDB related dependencies  
feat: Add related student function

##  Nov 19, 2024:

重构：移除 AI 阿罗娜聊天功能   
更新：Momotalk 单词拼写统一为 MomoTalk #40    
样式：播放动画时隐藏删除/插入按钮   

refactor: Remove the experimental feature "arona-ai"   
chore: Fix text "Momotalk" to "MomoTalk"   
style: Hide delete/insert buttons during playing.

##  Aug 17, 2024:

特性：懒加载添加缓存，优化重复请求  
修复：Sensei 第二页表情加载失败 #37  
修复：部分样式在暗黑模式下显示不正常 #26  
修复：移动端下方功能按钮被遮挡 #28  
更新：缩放功能 #30  
更新：Markdown 标题 h4~h6 #29  
更新：改善可访问性和语义 #36  
样式：添加 Blue Archive 韩国字体 #33  

feat: Lazy loading cache, optimized access  
feat: Zoom #30  
feat: Markdown headers h4~h6 #29  
fix: Sensei page 2 emoji loading failure #37  
fix: Some styles display incorrectly in dark mode #26  
fix: Buttons below are obstructed on mobile #28  
chore: Improve accessibility and semantics #36  
style: Add fonts of Blue Archive Korean #33  


### Apr 12, 2024:

文档：新增日语说明 #22 #23  
样式：支持全屏显示  
特性：图片懒加载，缩短打开时间

docs: Addition of Japanese Instructions #22 #23  
style: Support Full Screen Display  
feat: Lazy Loading of Images, Shorten Opening Time

### Jan 22, 2024:

特性：支持 markdown 设置字体样式  
特性：支持 yuzutalk 样式  
特性：新增可播放剧情的分享文件  
样式：更新学生头像列表展示方式  
修复：选项框中输入问题  
修复：移动端上下滑动容易误触拖拽   
修复：移动端 momotalk 播放器误触键盘  
重构：student类，优化导出文件结构  
更新：补全 NPC 角色差分  

feat: support markdown  
feat: theme yuzutalk  
feat: share custom story with "shared file"  
style: list avatars like yuzutalk  
fix: choice input  
fix: mobile drag and drop  
fix: mobile momotalk play open keyboard  
refactor: student interface  
chore: update student stickers

### Dec 30, 2023:

特性：支持对话历史导入导出 #17  
特性：支持插入编辑 #18  
特性：新增 AI 阿罗娜聊天功能  
特性：支持拼音搜索角色  
特性：支持繁体中文昵称搜索角色  
特性：新增角色差分  
特性：Shift+Enter=软换行  

feat: export/import chat history #17  
feat: Allow inserting message #18  
feat: chat with ARONA(AI)  
feat: support search by pinyin  
feat: support Traditional Chinese nicknames  
feat: character stickers  
feat: Shift + Enter = line break  

### Oct 12, 2023:

特性：新增momotalk播放器功能  
特性：支持韩语  
样式：优化羁绊于回复框样式  
更新：新增说明帮助页  

feat: momotalk player  
feat: support Korean  
style: event and reply button  
refactor: Options=>Compositions  
docs: add help page  

### Oct 1, 2023:

特性：支持撤回/重做  
特性：支持英语和繁体中文  
特性：支持移动端  
修复：一些样式问题  
修复：日语字体问题  

feat: undo and redo  
feat: supports English and Traditional Chinese  
feat: mobile.scss  
fix: some style problems  
fix: font Katakana macron  

### Aug 26, 2023: 

特性：中断消息流  
特性：按学校筛选  
更新：使用文档  
修复：只能添加一个自定义角色的问题  

feat: split talks on click  
feat: search by school  
docs: update How-to-use  
fix: custom role could be added only once  