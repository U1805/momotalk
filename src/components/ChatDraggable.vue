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

                    first: element.type <= 1 && element.flag > 0
                }"
            >
                <div
                    class="student--split"
                    v-if="element.type == 0 && element.flag === 0"
                    @click="splitTalks(element)"
                ></div>
                <div class="avatar" v-if="element.type === 0 && element.flag > 0">
                    <img :src="element.avatar" @click="splitTalks(element)" />
                </div>
                <div
                    class="name"
                    v-if="element.type === 0 && element.flag > 0"
                    contenteditable
                    @input="saveEdit($event, element.id, 'name')"
                >
                    {{ element.name }}
                </div>

                <div class="container">
                    <!-- 羁绊剧情 -->
                    <div class="box-story" v-if="element.type === 2">
                        <div
                            class="header"
                            contenteditable
                            @input="saveEdit($event, element.id, 'name')"
                        >
                            <div class="title">{{ element.name }}</div>
                        </div>
                        <div class="content">
                            <span
                                contenteditable
                                @input="saveEdit($event, element.id, 'content')"
                                >{{ element.content }}</span
                            >
                        </div>
                    </div>
                    <!-- 回复 -->
                    <div class="box-choice" v-else-if="element.type === 3">
                        <div
                            class="header"
                            contenteditable
                            @input="saveEdit($event, element.id, 'name')"
                        >
                            <div class="title">{{ element.name }}</div>
                        </div>
                        <div class="content">
                            <span
                                contenteditable
                                @input="saveEdit($event, element.id, 'content')"
                                ><div>{{ element.content }}</div></span
                            >
                        </div>
                    </div>
                    <!-- 系统通知 -->
                    <div class="box-message" v-else-if="element.type === 4">
                        <div class="content">
                            <span
                                contenteditable
                                @input="saveEdit($event, element.id, 'content')"
                                >{{ element.content }}</span
                            >
                        </div>
                    </div>
                    <!-- 图片消息 -->
                    <div
                        class="box img"
                        v-else-if="
                            element.content.startsWith('data:image') ||
                            element.content.startsWith('./Stickers/')
                        "
                    >
                        <typing-animation
                            class="loading"
                            v-if="typing > 0 && element.id === store.talkId - 1"
                        ></typing-animation>
                        <img
                            v-else
                            :src="element.content"
                            class="chat-img"
                            @click="changeImage($event, element.id)"
                        />
                    </div>
                    <!-- 文本消息 -->
                    <div class="box" v-else>
                        <typing-animation
                            class="loading"
                            v-if="typing > 0 && element.id === store.talkId - 1"
                        ></typing-animation>
                        <span
                            v-else
                            contenteditable
                            @input="saveEdit($event, element.id, 'content')"
                            >{{ element.content }}</span
                        >
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
        changeImage(evt: Event, id: number) {
            var reader = new FileReader()
            reader.addEventListener('load', () => {
                var ele = evt.target! as HTMLImageElement
                ele.src = reader.result as string
                store.setTalkContent(id, reader.result as string)
                console.log(reader.result as string)
            })
            readFile(reader)
        },
        checkMove(e: any) {
            // 拖动后设置 flag => 样式
            var i = e.newIndex
            var j = e.oldIndex
            var len = store.talkHistory.length
            if (store.talkHistory[i].type <= 1) {
                if (i > 0 && store.isSameChar(i - 1, i)) store.setTalkFlag(i, 0)
                else store.setTalkFlag(i, 2)
            }
            if (i < len - 1 && store.talkHistory[i + 1].type <= 1) {
                if (store.isSameChar(i, i + 1)) store.setTalkFlag(i + 1, 0)
                else store.setTalkFlag(i + 1, 2)
            }
            if (store.talkHistory[j].type <= 1) {
                if (j > 0 && store.isSameChar(j - 1, j)) store.setTalkFlag(j, 0)
                else store.setTalkFlag(j, 2)
            }
            if (j < len - 1 && store.talkHistory[j + 1].type <= 1) {
                if (store.isSameChar(j, j + 1)) store.setTalkFlag(j + 1, 0)
                else store.setTalkFlag(j + 1, 2)
            }
            store.setData()
        },
        splitTalks(element: Talk) {
            // 分段消息流
            // flag: 0 <-> 1,  2不可改
            if (element.flag < 2) element.flag = 1 - element.flag
            store.setData()
        },
        saveEdit(event: Event, id: number, type: string) {
            var span = event.target as HTMLElement
            if (type === 'name') store.setTalkName(id, span.innerText)
            if (type === 'content') store.setTalkContent(id, span.innerText)
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/chat-draggable.scss';
</style>
