<script setup lang="ts">
import TypingAnimation from '@/components/TypingAnimation.vue'
</script>

<template>
    <draggable :list="tasks" :group="{ name: 'g1' }" item-key="id">
        <template #item="{ element }">
            <div
                :class="{
                    student: element.type == 1,
                    sensei: element.type == 0,
                    story: element.type == 2
                }"
                v-if="element.talks.length != 0"
            >
                <div class="avatar" v-if="element.type == 1">
                    <img :src="element.avatar" />
                </div>
                <div class="name" v-if="element.type == 1" contenteditable>
                    {{ element.name }}
                </div>

                <div class="container">
                    <draggable :list="element.talks" item-key="id" :group="{ name: 'g2' }">
                        <template #item="{ element: talk }">
                            <div
                                :class="{
                                    horizontal: element.type != 2 /*避免影响 story box*/
                                }"
                            >
                                <span
                                    class="del"
                                    @click="store.deleteTalkById(talk.id)"
                                    v-if="element.type == 0 || element.type == 2"
                                    >×</span
                                >

                                <div class="box-story" v-if="element.type == 2">
                                    <div class="title"><span></span>羁绊剧情</div>
                                    <div class="content">
                                        <button>
                                            <span contenteditable>{{ talk.content }}</span>
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="box"
                                    v-else-if="
                                        talk.content.startsWith('data:image') ||
                                        talk.content.startsWith('./Stickers/')
                                    "
                                >
                                    <typing-animation
                                        class="loading"
                                        v-if="typing > 0 && talk.id == store.talkId - 1"
                                    ></typing-animation>
                                    <img v-else :src="talk.content" class="chat-img" @click="changeImage" />
                                </div>
                                <div class="box" v-else>
                                    <typing-animation
                                        class="loading"
                                        v-if="typing > 0 && talk.id == store.talkId - 1"
                                    ></typing-animation>
                                    <span v-else contenteditable>{{ talk.content }}</span>
                                </div>

                                <span
                                    class="del"
                                    @click="store.deleteTalkById(talk.id)"
                                    v-if="element.type == 1"
                                    >×</span
                                >
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { readFile } from '@/assets/utils/readFile'
import { store } from '@/assets/utils/store'

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
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/chat-box.scss';
</style>
