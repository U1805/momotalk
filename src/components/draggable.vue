<script setup lang="ts">
import Typing from '@/components/Typing.vue';
</script>

<template>
    <draggable :list="tasks" :group="{ name: 'g1' }" item-key="id">
    <template #item="{ element }">
        <div :class="{
            student: element.type == 1,
            sensei: element.type == 0,
            story: element.type == 2
        }">

            <div class="avatar"> <img :src="element.avatar" /> </div>
            <div class="name" contenteditable> {{ element.name }} </div>

            <div class="container">
                <draggable :list="element.talks" item-key="id" :group="{ name: 'g2' }">
                <template #item="{ element: talk }">
                    <div :class="{ horizontal: element.type != 2 }"> <!--避免影响 story box -->
                        <span class="del" @click="deleteTalk(element, talk.id)"
                            v-if="element.type == 0 || element.type == 2">×</span>

                        <div class="box-story" v-if="element.type == 2">
                            <div class="title"><span></span>羁绊剧情</div>
                            <div class="content"><button><span contenteditable>{{ talk.content }}</span></button>
                            </div>
                        </div>
                        <div class="box" v-else-if="talk.content.substr(0, 10) == 'data:image'">
                            <Typing class="loading" v-if="typing > 0 && talk.id == maxId"></Typing>
                            <img v-else :src="talk.content" class="chat-img" @click="changeImage">
                        </div>
                        <div class="box" v-else>
                            <Typing class="loading" v-if="typing > 0 && talk.id == maxId"></Typing>
                            <span v-else contenteditable>{{ talk.content }}</span>
                        </div>

                        <span class="del" @click="deleteTalk(element, talk.id)" 
                            v-if="element.type == 1">×</span>
                    </div>
                </template>
                </draggable>
            </div>
        </div>
    </template>
    </draggable>
</template>

<script lang="ts">
import { Talk } from '@/assets/utils/interface';
import draggable from 'vuedraggable'
import { readFile } from '@/assets/utils/readFile';

export default {
    props: {
        tasks: {
            required: true,
            type: Array
        },
        typing: null,
        maxId: null
    },
    components: {
        draggable,
        Typing
    },
    methods: {
        deleteTalk(element: Talk, id: number) {
            var index = element.talks.findIndex(
                (item: { "id": number, "content": string }) => item.id == id)
            element.talks.splice(index, 1)
            console.log(this.tasks);

            if (element.talks.length == 0) {
                this.$emit('deleteTalk', element.id)
            }
        },
        changeImage(evt: Event) {
            var reader = new FileReader();
            reader.addEventListener("load", () => {
                (evt.target! as HTMLImageElement).src = reader.result as string;
            });
            readFile(reader);
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/assets/css/chat-box.scss';
</style>