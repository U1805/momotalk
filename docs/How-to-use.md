![banner](./assets/演示2.webp)

# How to use

## 📚 Sidebar 

💾 Below, there are three buttons: "**Switch languages**", "**Reset**" and "**Download** as image". 

## 🎓 Student List 

🔍 Click on the **school icons**: Filter students by school. **Search bar** at the top(Shortcut key `/`), supports use Chinese , romaji as keywords

📜 Clicking the button on the right side of the search bar allows you to toggle between the "Implemented Characters" and "Unimplemented Characters" lists

<p align="center">
<img src="../public/img/switchlsit.webp" alt="switch_list" style="width:50%">
</p>

🔄 Students with a `+` on their avatars: Click on the avatar to switch **appearances**.

<p align="center">
<img src="../public/img/appearence.webp" alt="appearence" style="width:50%">
</p>


📝 Upon entering the editing interface, selecting students from the list will add them to the candidate list in the bottom right corner for easy access

## 🖌️ Edit

In the editing interface, there are the "Message Bar" and the "Candidate List" at the bottom

### 🎭 Select a Role

The first four items in the candidate list are "**Sensei**", "**Story Event**", "**Reply Box**", and "**System Message**". The last button is for **adding custom characters**.

<p align="center">
<img src="../public/img/sendbar.webp" alt="sendbar" style="width:50%">
</p>

### 🌄 Send Messages

After selecting a role, you can **send messages or images** in the message bar (size limit is 1MB). 

If the current role is a teacher or student, clicking on the avatar in the message bar allows you to send in-game chatroom **stickers**. In addition, student face variations is considered as a kind of special stickers too.

<p align="center">
<img src="../public/img/stickers.webp" alt="stickers" style="width:45%">
<img src="../public/img/stickers2.webp" alt="face variations" style="width:45%">
</p>


### ✏️ Edit Messages

You can use a syntax similar to [markdown](https://www.markdownguide.org/basic-syntax/) to send some **special text styles**.

Try sending an "`# Here is a Biiiig text`" message ~

| Usage |
| ---- |
| \# Heading level 1 |
| \#\# Heading level 2 |
| \#\#\# Heading level 3 |
| \*\*Bold text\*\* |
| \*Italic text\* |
| \*\*\*Bold italic text\*\*\* |
| \~\~Delete line\~\~ |
| \[color:red;font-size:10px](Font style) |

> The bold style of this font may not display correctly on certain browsers.
>
> Escaping can be achieved by using the backslash character \ (for `#`, `*`, `~`). For example, `\#` will output # instead of being interpreted as a heading.


Following the **WYSIWYG** (What you see is what you get) design philosophy, elements can still be directly edited after sending messages, such as modifying, dragging, deleting, etc. 

- **Modifying**: Supports editing *text*, *character names*, and *images*.
  - For " *Text* " and " Character name ", simply click to reveal a text box for editing.
  - For " *Image* ", click to upload a new image.
  - For " *Reply* ", pressing Enter will bring up the next option.
- **Dragging**: Holding and moving messages up and down can adjust the order between messages.
- **Deleting**: When the cursor *hovers* over an element, the delete button `x` will appear near the element.
- **Inserting**: When the cursor is *hovering* over an element, the insert button `↲` appears, then the message will be inserted here.
- **Shortcut key**: undo `Ctrl+Z`, redo `Ctrl+Shift+Z`, and line break `Shift+Enter`

<p align="center">
<img src="../public/img/edit.webp" alt="edit" style="width:50%">
</p>

### 📜 Interrupt the Message Flow

Normally, messages from a single student are continuous. If you wish to interrupt the message flow, you can try clicking below the "avatar" in the student's message.

<div align="center">
<img src="../public/img/splitmessage.webp" alt="split" style="width:50%">

<p>via <a href="https://twitter.com/YuzuTalkJP/status/1421448297030381569">Yuzutalk</a> </p>
</div>

## ⚙️ Settings Interface Interface

Click on the gear icon in the upper right corner to access the settings. You can switch to the **Yuzutalk theme**, enable **full-screen** mode, and import or export your conversations.

In the experimental features, there is also an option to export your conversations as a **sharefile**. This file allows others to watch your story in animated form. Please prepare the **Chat with Arona** feature using the openai-api on your own.

<p align="center">
<img src="./assets/setting.webp" alt="setting" style="width:50%">
</p>

## 🌟 Others

The application is adapted for mobile devices, but due to limited capabilities, it's recommended to use it on a computer for a better experience 💻📱

If you notice any omissions or mistakes, **please feel free to raise an [issue](https://github.com/U1805/momotalk/issues) or submit a [pull request](https://github.com/U1805/momotalk/pulls) for correction**. Of course, ideas and optimizations for features and code are also very much welcomed ❤️

![thanks](../public/img/kyk.gif)