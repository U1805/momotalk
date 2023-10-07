<template>
    <main class="talk-wrapper">
        <!-- 聊天主界面 -->
        <div class="talk-list" id="talkList">
            <chat-draggable :tasks="talkHistory.talkHistory" />
        </div>
        <!-- 聊天主界面 -->

        <div class="add" id="sendBar">
            <div class="input-bar">
                <!-- 贴图 -->
                <Popper placement="top">
                    <div class="sticker" id="sticker">
                        <div v-if="selected === 1" title="Send a Sticker">
                            <ProfileIcon class="icon profile" />
                        </div>
                        <div v-else-if="selected === 2">
                            <HeartIcon class="heart icon" />
                        </div>
                        <div v-else-if="selected === 3">
                            <ChoiceIcon class="choice icon" />
                        </div>
                        <div v-else-if="selected === 4">
                            <BellIcon class="heart bell" />
                        </div>
                        <div
                            v-else-if="typeof selected != 'number'"
                            style="padding: 0px; margin: 0px"
                            class="item"
                            title="Send a Sticker"
                        >
                            <img :src="selected.Avatar[selected.cnt]" />
                        </div>
                    </div>
                    <template #content>
                        <div class="sticker-wrapper">
                            <div v-for="(sticker, index) in stickers" :key="index">
                                <img
                                    :src="sticker"
                                    @click="sendSticker(selected, sticker)"
                                />
                            </div>
                        </div>
                    </template>
                </Popper>
                <!-- 贴图 -->

                <!-- 发送 -->
                <input
                    class="text"
                    placeholder="Aa"
                    v-model="store.text"
                    @keyup.enter="sendText(selected, store.text)"
                />
                <div class="photo" title="Send an Image">
                    <ImageIcon @click="sendImage(selected)" class="image icon" />
                </div>
                <div class="message" title="Send the Message">
                    <SendIcon @click="sendText(selected, store.text)" class="send icon" />
                </div>
                <!-- 发送 -->
            </div>
            <div class="g-wrap">
                <div class="g-scroll">
                    <div class="g-content selected-student">
                        <!-- 身份选择 -->
                        <div class="item-sensei" @click="selectChar(1)">
                            <div title="send Sensei message">
                                <ProfileIcon class="icon profile" />
                            </div>
                        </div>
                        <div class="item-sensei" @click="selectChar(2)">
                            <div title="send Event message">
                                <HeartIcon class="heart icon" />
                            </div>
                        </div>
                        <div class="item-sensei" @click="selectChar(3)">
                            <div title="send Reply message">
                                <ChoiceIcon class="choice icon" />
                            </div>
                        </div>
                        <div class="item-sensei" @click="selectChar(4)">
                            <div title="send System message">
                                <BellIcon class="heart bell" />
                            </div>
                        </div>

                        <div
                            class="item"
                            v-for="(student, index) in selectList.selectList"
                            :key="index"
                            @click="selectChar(student)"
                            title="Remove from list"
                        >
                            <img :src="student.Avatar[student.cnt]" />
                            <CloseIcon
                                class="delete-button"
                                @click="deleteStudent(student.Id)"
                                @click.stop=""
                            />
                        </div>
                        <div
                            class="item-sensei"
                            @click="addCustomStudent"
                            title="Add a customed student"
                        >
                            <AddIcon class="image icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import ProfileIcon from '@/components/icons/IconProfile.vue'
import SendIcon from '@/components/icons/IconSend.vue'
import ImageIcon from '@/components/icons/IconImage.vue'
import CloseIcon from '@/components/icons/IconClose2.vue'
import HeartIcon from '@/components/icons/IconHeart.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import BellIcon from '@/components/icons/IconBell.vue'
import ChoiceIcon from '@/components/icons/IconChoice.vue'
// ======================= Icon
import ChatDraggable from '@/components/ChatDraggable.vue'
import Popper from 'vue3-popper'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

import i18n from '@/assets/locales/i18n'
import { myStudent } from '@/assets/utils/interface'
import { stickers } from '@/assets/utils/stickers'
import { getMessage } from '@/assets/utils/request'
import { getRole } from '@/assets/chatUtils/role'
import { readFile } from '@/assets/imgUtils/readFile'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { selectList } from '@/assets/storeUtils/selectList'
import { sendText, sendImage, sendSticker } from '@/assets/chatUtils/send'

const props = defineProps(['student'])
const emits = defineEmits(['deactive'])

const selected = ref<myStudent | number>(1)

// 添加到列表
watch(props, (newProps) => {
    if (newProps.student) {
        selectList.pushStudent(newProps.student)
        selectChar(newProps.student)
    }
})
const selectChar = (student: myStudent | number) => {
    selected.value = student
}
const addCustomStudent = () => {
    let name: string | null = ''
    while (name.length === 0) {
        name = prompt(i18n.global.t('customRoleInfo'))
        if (name === null) return
    }
    var reader = new FileReader()
    reader.addEventListener('load', () => {
        var student: myStudent = getRole(name!, reader.result as string)
        selectList.pushStudent(student)
    })
    readFile(reader)
}

// 从列表删除
const deleteStudent = (id: number) => {
    emits('deactive')
    selectList.deleteStudent(id)
    selectChar(1)
}

// 滚动 & 判断播放
onMounted(async () => {
    var scroll_to_bottom = document.getElementById('talkList') as HTMLElement
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight
    const route = useRoute()
    let id = route.query.id as string
    if (id) {
        store.storyKey = id
        store.storyList = (await getMessage(store.storyKey, 'index')) as string[]
        if (store.storyList) {
            if (!store.storyList.find((ele) => ele === store.storyFile))
                store.storyFile = store.storyList[0]
            store.showDialog = true
        }
    }
})
</script>

<style scoped lang="scss">
@import './chat-view.scss';
@import '@/assets/css/icons.scss';

// 横向滚动 https://codepen.io/Chokcoco/pen/PoRLpGO
$bar-height: calc($chatfooter-height/2);

.g-wrap {
    position: relative;
    margin: auto;
    width: 100%;
    height: $bar-height;
    cursor: pointer;
}

.g-scroll {
    position: absolute;
    left: -$bar-height;
    width: $bar-height;
    height: calc(($view-width - $sider-width) / 2);
    transform-origin: 100% 0;
    transform: rotate(-90deg);
    overflow: scroll;
    overflow-x: hidden;
}

.g-content {
    position: absolute;
    top: 0;
    left: $bar-height;
    width: fit-content;
    height: $bar-height;
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

@import '@/assets/css/mobile.scss';
</style>
