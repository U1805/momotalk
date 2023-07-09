<script setup lang="ts">
import ProfileIcon from '@/components/icons/IconProfile.vue'
import SendIcon from '@/components/icons/IconSend.vue'
import ImageIcon from '@/components/icons/IconImage.vue'
import CloseIcon from '@/components/icons/IconClose2.vue'
import HeartIcon from '@/components/icons/IconHeart.vue'
import AddIcon from '@/components/icons/IconAdd.vue'

import ChatDraggable from '@/components/ChatDraggable.vue'
import Popper from 'vue3-popper'
</script>

<template>
  <main class="talk-wrapper">
    <!-- 聊天主界面 -->
    <div class="talk-list">
      <chat-draggable
        :tasks="talkHistory"
        :typing="typing"
        :maxId="talkId - 1"
        @deleteTalk="deleteTalkId"
      />
    </div>
    <!-- 聊天主界面 -->

    <div class="add">
      <div class="input-bar">
        <!-- 贴图 -->
        <Popper placement="top">
          <div class="sticker">
            <div v-if="selected == 0"><ProfileIcon class="profile-icon" /></div>
            <div v-else-if="selected == 1" style="background-color: #fed5de">
              <HeartIcon class="heart-icon" />
            </div>
            <div
              v-else-if="typeof selected != 'number'"
              style="padding: 0px; margin: 0px"
              class="item"
            >
              <img :src="selected.Avatar" />
            </div>
          </div>
          <template #content>
            <div class="sticker-wrapper">
              <div v-for="(sticker, index) in stickers" :key="index">
                <img :src="sticker" @click="sendSticker(sticker)" />
              </div>
            </div>
          </template>
        </Popper>
        <!-- 贴图 -->
        <!-- 发送 -->
        <input class="text" placeholder="Aa" v-model="text" @keyup.enter="sendText" />
        <div class="photo"><ImageIcon @click="sendImage" class="image-icon" /></div>
        <div class="send"><SendIcon @click="sendText" class="send-icon" /></div>
        <!-- 发送 -->
      </div>
      <div class="g-wrap">
        <div class="g-scroll">
          <div class="g-content selected-student">
            <!-- 身份选择 -->
            <div class="item-sensei" @click="selectStudent(0)">
              <div><ProfileIcon class="profile-icon" /></div>
            </div>
            <div class="item-heart" @click="selectStudent(1)">
              <div><HeartIcon class="heart-icon" /></div>
            </div>
            <div
              class="item"
              v-for="(student, index) in selectList"
              :key="index"
              @click="selectStudent(student)"
            >
              <img :src="student.Avatar" />
              <CloseIcon class="delete-button" @click="deleteStudent(index)" />
            </div>
            <div class="item-sensei" @click="addStudent">
              <AddIcon class="image-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { myStudent, Talk } from '@/assets/utils/interface'
import { readFile } from '@/assets/utils/readFile'
import { stickers } from '@/assets/utils/stickers'

export default defineComponent({
  components: {
    ChatDraggable,
    Popper
  },
  props: {
    student: null,
    studentId: null
  },
  data() {
    return {
      selectList: [] as myStudent[],
      selected: 0 as myStudent | number,
      talkHistory: [] as Talk[],
      talkId: 0,
      text: '' as string,
      image: '' as string,
      typing: 0 as number,
      stickers: stickers as string[]
    }
  },
  watch: {
    student(newStudent) {
      if (this.selectList.indexOf(newStudent) == -1) {
        this.selectList.push(newStudent)
        this.selectStudent(newStudent)
      }
    }
  },
  methods: {
    deleteTalkId(id: number) {
      // 删除对话中的一个头像
      var index: number = this.talkHistory.findIndex((talk: Talk) => {
        return talk.id == id
      })
      this.talkHistory.splice(index, 1)
    },
    deleteStudent(index: number) {
      // 从列表中删除学生
      this.selectList.splice(index, 1)
    },
    selectStudent(student: myStudent | number) {
      // 选择学生添加到列表
      this.selected = student
    },
    sendText() {
      if (this.text.length == 0) return
      // 新建对话
      var name: string = ''
      var avatar: string = ''
      var type: number = 0

      if (this.selected == 0) {
        // sensei
        type = 0
        name = 'sensei'
      } else if (this.selected == 1) {
        type = 2
        name = 'story'
      } else if (typeof this.selected != 'number') {
        type = 1
        name = this.selected.Name
        avatar = this.selected.Avatar
      }

      var newTalk: Talk = {
        id: this.talkId,
        type: type,
        name: name,
        avatar: avatar,
        talks: [{ id: this.talkId++, content: this.text }]
      }

      var len = this.talkHistory.length
      if (len == 0)
        // 聊天记录为空
        this.talkHistory.push(newTalk)
      else if (name == this.talkHistory[len - 1].name)
        // 和上一条同一说话人
        this.talkHistory[len - 1].talks.push(newTalk.talks[0])
      // 不同说话人
      else this.talkHistory.push(newTalk)

      console.log(this.talkHistory)
      this.text = ''
      this.typing = 1
      var scroll_to_bottom = document.getElementsByClassName('talk-list')[0]
      var that = this
      var timer = setInterval(() => {
        that.typing -= 0.01
        if (that.typing < 0.9) {
          scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
        }
        if (that.typing < -1) {
          that.typing = 0
          clearInterval(timer)
        }
      }, 10)
    },
    sendImage() {
      if (this.selected == 1) return // story card 不能插入图片
      var that = this
      var reader = new FileReader()
      reader.addEventListener('load', () => {
        that.text = reader.result as string // 将图像文件转换为 base64 字符串
        that.sendText()
      })
      readFile(reader)
    },
    sendSticker(url: string) {
      if (this.selected == 1) return // story card 不能插入图片
      this.text = url
      this.sendText()
    },
    addStudent() {
      // 添加自定义学生到列表
      if (this.selected == 1) return
      var that = this
      var reader = new FileReader()
      reader.addEventListener('load', () => {
        var name = ''
        while (name.length == 0) {
          name = prompt('请输入自定义角色名')!
          if (name == null) return
        }
        var student: myStudent = {
          Id: 0,
          Avatar: reader.result as string,
          Birthday: '',
          Bio: '',
          Name: name
        }
        that.selectList.push(student)
      })
      readFile(reader)
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/css/chat.scss';

// 横向滚动 https://codepen.io/Chokcoco/pen/PoRLpGO
.g-wrap {
  position: relative;
  margin: auto;
  width: 100%;
  height: calc($chatfooter-height/2);
  cursor: pointer;
}

.g-scroll {
  position: absolute;
  left: -60px;
  width: 60px;
  height: calc(($view-width - $sider-width) / 2);
  transform-origin: 100% 0;
  transform: rotate(-90deg);
  overflow: scroll;
  overflow-x: hidden;
}

.g-content {
  position: absolute;
  top: 0;
  left: 60px;
  width: fit-content;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  transform-origin: 0 0;
  box-sizing: border-box;
  transform: rotate(90deg);
}

/* hide scrollbar */
::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-button {
  display: none;
}
</style>
