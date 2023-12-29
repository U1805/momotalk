<template>
    <main class="talk-wrapper">
        <!-- 聊天主界面 -->
        <div class="talk-list" id="talkList">
            <div v-for="element in talkHistory.talkHistory" :class="{
                student: element.type === 0,
                sensei: element.type === 1,

                first: element.type <= 1 && element.flag > 0
            }">
                <div class="avatar" v-if="element.type === 0 && element.flag > 0">
                    <img :src="element.avatar" />
                </div>
                <div class="name" v-if="element.type === 0 && element.flag > 0">
                    {{ element.name }}
                </div>

                <div class="container">
                    <div class="box"><span>{{ element.content }}</span></div>
                </div>
            </div>
        </div>
        <!-- 聊天主界面 -->

        <div class="add" id="sendBar">
            <div class="input-bar">
                <div class="sticker" id="sticker">
                    <div>
                        <ProfileIcon class="icon profile" />
                    </div>
                </div>
                <textarea class="text" placeholder="Aa" v-model="store.text"></textarea>
                <div class="message" title="Send the Message">
                    <SendIcon @click="newSendText" class="send icon" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import ProfileIcon from '@/components/icons/IconProfile.vue'
import SendIcon from '@/components/icons/IconSend.vue'
import { onMounted } from 'vue'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { sendText } from '@/assets/chatUtils/send'
import { chat2arona } from '@/assets/chatUtils/arona'

const newSendText = () => {
    let text = store.text
    sendText(1, text)
    console.log("user", text)
    chat2arona(text)
}

onMounted(async () => {
    // 软换行
    store.resetData()
    chat2arona("进入角色扮演模式")
    var textarea = document.querySelector("textarea") as HTMLElement
    textarea.onkeyup = (e) => {
        if (!e.shiftKey && e.key === 'Enter') {
            store.text = store.text.trimEnd()
            newSendText()
        }
    }
})
</script>

<style scoped lang="scss">
@import '@/assets/css/chat-draggable.scss';
@import './chat-view.scss';
@import '@/assets/css/icons.scss';

@import '@/assets/css/mobile.scss';

#talkList {
    height: calc(100% - 60px);
}
</style>
