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
                    <div v-for="talk in element.talks" :class="{ horizontal: element.type != 2 }"> <!-- 避免影响 story box -->
                        <span class="del" @click="deleteTalk(element, talk.id)"
                            v-if="element.type == 0 || element.type == 2">×</span>

                        <div class="box-story" v-if="element.type == 2">
                            <div class="title"><span></span>羁绊剧情</div>
                            <div class="content"><button><span contenteditable>{{ talk.content }}</span></button></div>
                        </div>
                        <div class="box" v-else-if="talk.content.substr(0, 10) == 'data:image'">
                            <img :src="talk.content" class="chat-img">
                        </div>
                        <div class="box" v-else><span contenteditable>{{ talk.content }}</span></div>

                        <span class="del" @click="deleteTalk(element, talk.id)" v-if="element.type == 1">×</span>
                    </div>
                </div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import { Talk } from '@/assets/utils/interface';
import draggable from 'vuedraggable'

export default {
    props: {
        tasks: {
            required: true,
            type: Array
        }
    },
    components: {
        draggable
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
    }
};
</script>
<style scoped lang="scss">
@import '@/assets/css/chat-box.scss';

</style>