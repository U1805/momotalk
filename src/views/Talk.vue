<template>
  <div class="talk-wrapper" ref="dom">
    <div class="title">
      <div class="back" @click="back">
        <svg
          style="height: 25px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
        >
          <path
            d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z"
            fill="#979797"
          ></path>
        </svg>
      </div>
      <span class="title-text" contenteditable @input="titleChange($event)">
        {{ data.list[data.index].title }}
      </span>
    </div>
    <div class="talk-list" ref="listDom">
      <draggable
        tag="transition-group"
        :component-data="{ name: 'list', type: 'transition' }"
        v-model="talkList"
        :item-key="(item: ReplyItem) => `comment-${talkList.indexOf(item)}`"
      >
        <template #item="{ element, index }">
          <div
            class="item"
            :class="{ right: element.key === '指挥官' }"
            :style="{
              padding: element.key === '指挥官' ? '0 20px 0 5px' : ''
            }"
            @click="avatarClick(4, index)"
          >
            <Avatar
              :highlight="select.type === 4 && select.index === index"
              :src="element.avatar"
              v-if="
                element.key !== '指挥官' &&
                (index === 0 || element.key !== talkList[index - 1].key)
              "
            />
            <div v-else-if="element.key !== '指挥官'" class="empty"></div>
            <div
              style="max-width: 85%"
              :style="{
                marginLeft: element.key === '指挥官' ? '45px' : ''
              }"
            >
              <div
                class="name"
                v-if="
                  element.key !== '指挥官' &&
                  (index === 0 || element.key !== talkList[index - 1].key)
                "
              >
                <span contenteditable @input="nameChange(index, $event)">
                  {{ element.name }}
                </span>
              </div>
              <div class="text">
                <span contenteditable @input="textChange(index, $event)">
                  {{ element.text }}
                </span>
                <img class="img" v-if="element.img" :src="element.img" @click.stop="imgChange(index)" />
                <div class="del" @click.stop="delComment(index)">×</div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="add">
      <Avatar :width="40" :src="input.avatar" @click="avatarClick(0)" />
      <input
        class="input"
        v-model="input.text"
        placeholder="Aa"
        @keydown.enter="addComment()"
      />
      <img
        src="@/assets/images/图片.png"
        style="cursor: pointer; width: 34px; margin-right: 2px"
        @click="addImage"
      />
      <img
        src="@/assets/images/message_2.png"
        style="cursor: pointer; width: 29px"
        @click="addComment()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import _screenshot from '@/assets/scripts/screenshot'
import Avatar from '@/components/common/Avatar.vue'
import input from '@/store/input'
import { resetSelectData, select } from '@/store/select'
import { setting } from '@/store/setting'
import data from '@/store/talk'
import draggable from '@marshallswain/vuedraggable'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const tempList = ref<ReplyItem[]>([])
const talkList = computed({
  get: () => setting.play ? tempList.value : data.list[data.index].list,
  set: (val) => {
    if (!setting.play) {
      data.list[data.index].list = val
    }
  }
})

const back = () => {
  reset()
  data.home = true
}

const dom = ref<HTMLElement | null>(null)
const listDom = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    listDom.value?.scrollTo({
      top: listDom.value?.scrollHeight,
      behavior: 'smooth'
    })
  })
}

const addComment = (img?: string) => {
  data.list[data.index].list.push({
    ...input,
    img,
    text: img ? input.text : input.text || '谢谢你，碧蓝航线'
  })
  scrollToBottom()
  input.text = ''
  timeUpdate()
}

const delComment = (index: number) => {
  resetSelectData()
  data.list[data.index].list.splice(index, 1)
  timeUpdate()
}

const addImage = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    if (input.files?.[0]) {
      const file = new FileReader()
      file.readAsDataURL(input.files[0])
      file.onload = e => {
        addComment(e.target?.result as string)
      }
    }
  }
  input.click()
}

const titleChange = (e: Event) => {
  data.list[data.index].title = (e.target as HTMLInputElement).innerText
  timeUpdate()
}

const textChange = (index: number, e: Event) => {
  data.list[data.index].list[index].text = (e.target as HTMLInputElement).innerText
  timeUpdate()
}

const imgChange = (index: number) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    if (input.files?.[0]) {
      const file = new FileReader()
      file.readAsDataURL(input.files[0])
      file.onload = e => {
        data.list[data.index].list[index].img = e.target?.result as string
        timeUpdate()
      }
    }
  }
  input.click()
}

const nameChange = (index: number, e: Event) => {
  data.list[data.index].list[index].name = (e.target as HTMLInputElement).innerText
  timeUpdate()
}

const avatarClick = (type: number, index = 0) => {
  select.type = type
  select.index = index
}

const timeUpdate = () => {
  data.list[data.index].time = Date.now()
}

const screenshot = () => {
  if (dom.value && listDom.value) {
    reset()
    _screenshot(dom.value, dom.value.offsetWidth, listDom.value.scrollHeight + 60 + 50)
  }
}

const autoPlay = () => {
  if (setting.play || data.list[data.index].list.length < 1) return

  setting.play = true

  reset()

  tempList.value = []

  setTimeout(() => {
    _addComment(0)
  }, 100)
}

const _addComment = (i: number) => {
  if (!setting.play) return

  tempList.value.push(data.list[data.index].list[i])
  nextTick(() => {
    scrollToBottom()

    if (data.list[data.index].list[i + 1]) {
      setTimeout(() => {
        _addComment(i + 1)
      }, setting.interval)
    } else {
      setting.play = false
    }
  })
}

const stopPlay = () => {
  setting.play = false
  tempList.value = []
  scrollToBottom()
}

const reset = () => {
  select.type = 0
  input.key = '指挥官'
  input.avatar = require('@/assets/images/commander.jpg')
  input.name = '指挥官'
}

let timer: number
onMounted(() => {
  timer = setTimeout(scrollToBottom, 320)
})
onBeforeUnmount(() => {
  clearTimeout(timer)
})

defineExpose({ screenshot, autoPlay, stopPlay })
</script>

<style lang="stylus" scoped>
$text-color = #555

bottomBar()
  height 40px
  padding 10px 5px
  background #eee

.talk-wrapper
  display flex
  flex-direction column
  max-width 100vw
  min-height 100vh
  background #eff7ff

  .title
    display flex
    justify-content flex-start
    align-items center
    height 35px
    color $text-color
    font-size 16px
    font-weight bold

    .back
      cursor pointer
      height 100%
      display flex
      align-items center
      justify-content center

    .title-text
      max-width 60%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis

  .talk-list
    flex 1
    overflow-x hidden
    padding 10px 0

    .item
      box-sizing border-box
      display flex
      width 100%
      padding 0 10px 0 15px

      .empty
        width 45px

      .name
        font-weight bold
        margin-left 10px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden

      .text
        position relative
        padding 10px
        margin 5px 10px
        border-radius 0px 10px 10px 10px
        background #fff
        color $text-color
        width fit-content
        max-width 90%
        box-shadow 0px 0px 6px rgba(0, 0, 0, 0.12)

        &:hover
          .del
            opacity 1

        .del
          position absolute
          right -20px
          top 50%
          transform translateY(-50%)
          color #000
          font-size 20px
          line-height 20px
          user-select none
          cursor pointer
          opacity 0
          transition opacity 0.2s

          &:hover
            opacity 1

.add
  position sticky
  bottom 0
  display flex
  align-items center
  justify-content space-between
  bottomBar()

  .input
    flex 1
    width 0
    font-size 20px
    color #666
    padding 5px 10px
    margin 0 8px
    height 24px
    border-radius 5px
    border 1px solid #aaa

.right
  flex-direction row-reverse

  .text
    background #87cefa !important
    border-radius 10px 0px 10px 10px !important

    .del
      left -20px
      right unset !important
      color #000

.img
  width 100%
  cursor pointer
</style>
