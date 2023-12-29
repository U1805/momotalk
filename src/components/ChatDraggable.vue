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
                <!-- 学生信息 -->
                <div
                    class="student--split"
                    v-if="element.type === 0 && element.flag === 0"
                    @click="splitTalks(element)"
                ></div>
                <div class="avatar" v-if="element.type === 0 && element.flag > 0">
                    <img :src="element.avatar" @click="splitTalks(element)" />
                </div>
                <div
                    class="name"
                    v-if="element.type === 0 && element.flag > 0"
                    contenteditable
                    @blur="saveEdit($event, element.id, 'name')"
                >
                    {{ element.name }}
                </div>

                <div class="container">
                    <!-- 羁绊剧情 -->
                    <div class="box-story" v-if="element.type === 2">
                        <div
                            class="header"
                            contenteditable
                            @blur="saveEdit($event, element.id, 'name')"
                        >
                            <div class="title">{{ element.name }}</div>
                        </div>
                        <div class="content">
                            <span
                                contenteditable
                                @blur="saveEdit($event, element.id, 'content')"
                                >{{ element.content }}</span
                            >
                        </div>
                    </div>
                    <!-- 回复 -->
                    <div class="box-choice" v-else-if="element.type === 3">
                        <div
                            class="header"
                            contenteditable
                            @blur="saveEdit($event, element.id, 'name')"
                        >
                            <div class="title">{{ element.name }}</div>
                        </div>
                        <div class="content">
                            <span
                                ><div
                                    v-for="(con, index) of element.content.split('\n')"
                                    contenteditable
                                    @input="saveReplyEdit($event, element.id, index)"
                                    :key="index"
                                >
                                    {{ con.replace('\n', '') }}
                                </div>
                            </span>
                        </div>
                    </div>
                    <!-- 系统通知 -->
                    <div class="box-message" v-else-if="element.type === 4">
                        <div class="content">
                            <span
                                contenteditable
                                @blur="saveEdit($event, element.id, 'content')"
                                >{{ element.content }}</span
                            >
                        </div>
                    </div>
                    <!-- 图片消息 -->
                    <div
                        class="box img"
                        v-else-if="checkImg(element.content)"
                    >
                        <typing-animation
                            class="loading"
                            v-if="store.typing > 0 && element.id === talkHistory.talkId - 1"
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
                            v-if="store.typing > 0 && element.id === talkHistory.talkId - 1"
                        ></typing-animation>
                        <span
                            v-else
                            contenteditable
                            @blur="saveEdit($event, element.id, 'content')"
                            >{{ element.content }}</span
                        >
                    </div>
                    <span class="action-block" >
                        <span @click="talkHistory.deleteTalkById(element.id)">x</span>
                        <span @click="setInsert(element.id)">↲</span>
                    </span>
                </div>
                <div class="insert-indicator" v-if="store.insertId === element.id">insert here</div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { readFile } from '@/assets/imgUtils/readFile'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { saveReplyEdit } from '@/assets/storeUtils/saveReplyEdit'
import { Talk } from '@/assets/utils/interface'

export default {
    props: {
        tasks: {
            required: true,
            type: Array
        }
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
                talkHistory.setTalkContent(id, reader.result as string)
            })
            readFile(reader)
        },
        checkMove(e: any) {
            // 拖动后设置 flag => 样式
            var i = e.newIndex
            var j = e.oldIndex
            talkHistory.checkMove(i, j)
        },
        splitTalks(element: Talk) {
            // 分段消息流，0->1，1->0，2不可改
            if (element.flag < 2) element.flag = 1 - element.flag
            talkHistory.setData()
        },
        saveEdit(event: Event, id: number, type: string) {
            var span = event.target as HTMLElement
            if (type === 'name') talkHistory.setTalkName(id, span.innerText)
            if (type === 'content') talkHistory.setTalkContent(id, span.innerText)
        },
        checkImg(content: string){
            const suffix = `(bmp|jpg|png|tif|gif|svg|webp|jpeg)`
            var regular = new RegExp(`(data:image.*)|((http|https)\:\/\/.*\.${suffix})`)
            return regular.test(content)
        },
        setInsert(insertId: number){
            if (store.insertId === insertId) {
                store.insertId = -1
            } else {
                store.insertId = insertId
                var textarea = document.querySelector('textarea') as HTMLElement
                textarea.focus()
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/chat-draggable.scss';
</style>
