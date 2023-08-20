<script setup lang="ts">
import TypingAnimation from '@/components/TypingAnimation.vue'
</script>

<template>
    <draggable :list="tasks" :group="{ name: 'g1' }" item-key="id" @end="checkMove">
        <template #item="{ element }">
            <div
                :class="{
                    student: element.type === 0,
                    sensei: element.type === 1,
                    story: element.type === 2,
                    choice: element.type == 3,
                    message: element.type === 4,

                    first: element.type <= 1 && element.content.flag > 0
                }"
            >
                <div
                    class="student--split"
                    v-if="element.type == 0 && element.content.flag === 0"
                    @click="splitTalks(element)"
                ></div>
                <div class="avatar" v-if="element.type === 0 && element.content.flag > 0">
                    <img :src="element.content.avatar" @click="splitTalks(element)" />
                </div>
                <div class="name" v-if="element.type === 0 && element.content.flag > 0" contenteditable>
                    {{ element.content.name }}
                </div>

                <div class="container">
                    <div class="box-story" v-if="element.type === 2">
                        <div class="header" contenteditable>
                            <div class="title">羁绊剧情</div>
                        </div>
                        <div class="content">
                            <span contenteditable @input="saveEdit($event ,element.id)">{{ element.content }}</span>
                        </div>
                    </div>
                    <div class="box-choice" v-else-if="element.type === 3">
                        <div class="header" contenteditable>
                            <div class="title">回复</div>
                        </div>
                        <div class="content">
                            <span contenteditable @input="saveEdit($event ,element.id)"><div>{{ element.content }}</div></span>
                        </div>
                    </div>
                    <div class="box-message" v-else-if="element.type === 4">
                        <div class="content">
                            <span contenteditable @input="saveEdit($event ,element.id)">{{ element.content }}</span>
                        </div>
                    </div>

                    <div
                        class="box img"
                        v-else-if="
                                    (element.content.text as string).startsWith('data:image') ||
                                    (element.content.text as string).startsWith('./Stickers/')
                                "
                    >
                        <typing-animation
                            class="loading"
                            v-if="typing > 0 && element.id === store.talkId - 1"
                        ></typing-animation>
                        <img v-else :src="element.content.text" class="chat-img" @click="changeImage" />
                    </div>
                    <div class="box" v-else>
                        <typing-animation
                            class="loading"
                            v-if="typing > 0 && element.id === store.talkId - 1"
                        ></typing-animation>
                        <span v-else contenteditable @input="saveEdit($event ,element.id)">{{ element.content.text }}</span>
                    </div>

                    <span class="del" @click="store.deleteTalkById(element.id)">×</span>
                </div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { readFile } from '@/assets/utils/readFile'
import { store } from '@/assets/utils/store'
import { Talk } from '@/assets/utils/interface'

export default {
    props: {
        tasks: {
            required: true,
            type: Array
        },
        typing: null
    },
    components: {
        draggable,
        TypingAnimation
    },
    methods: {
        changeImage(evt: Event) {
            var reader = new FileReader()
            reader.addEventListener('load', () => {
                ;(evt.target! as HTMLImageElement).src = reader.result as string
            })
            readFile(reader)
        },

        setFlag(i: number, flag: number) {
            ;(store.talkHistory[i].content as any).flag = flag
        },
        checkMove(e: any) {
            // 拖动后设置 flag => 样式
            var i = e.newIndex
            var j = e.oldIndex
            var len = store.talkHistory.length
            if (store.talkHistory[i].type <= 1) {
                if (i > 0 && store.isSameChar(i - 1, i)) this.setFlag(i, 0)
                else this.setFlag(i, 2)
            }
            if (i < len - 1 && store.talkHistory[i + 1].type <= 1) {
                if (store.isSameChar(i, i + 1)) this.setFlag(i + 1, 0)
                else this.setFlag(i + 1, 2)
            }
            if (store.talkHistory[j].type <= 1) {
                if (j > 0 && store.isSameChar(j - 1, j)) this.setFlag(j, 0)
                else this.setFlag(j, 2)
            }
            if (j < len - 1 && store.talkHistory[j + 1].type <= 1) {
                if (store.isSameChar(j, j + 1)) this.setFlag(j + 1, 0)
                else this.setFlag(j + 1, 2)
            }
            store.setData()
        },
        splitTalks(element: Talk) {
            // 分段消息流
            // flag: 0 <-> 1,  2不可改
            if ((element.content as any).flag < 2)
                (element.content as any).flag = 1 - (element.content as any).flag
            store.setData()
        },
        saveEdit(event: Event, id: number){
            var span = event.target as HTMLElement
            store.setTalkContent(id, span.innerText)
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/chat-draggable.scss';
</style>
