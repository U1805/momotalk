<template>
    <div class="teacher-chat">
        <div v-for="(talk, index) in talks.talks" style="display: flex; flex-direction:row;">
            <span class="del" @click="deleteTalk(index)">×</span>
            <div class="box" v-if="talk.substr(0, 10) == 'data:image'"><img :src="talk" class="chat-img"></div>
            <div class="box" v-else contenteditable>{{ talk }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        talks: null
    },
    methods: {
        deleteTalk(index: number) {
            this.talks.talks.splice(index, 1);
            if (this.talks.talks.length == 0) {
                this.$emit('deleteTalk', this.talks.id)
            }
        }
    }
})
</script>

<style scoped>
.teacher-chat {
    padding: 10px 25px 10px 50px;
    display: flex;
    flex-direction: column;
    align-items: end;
}

.box {
    position: relative;
    padding: 10px;
    width: fit-content;
    height: fit-content;
    color: #ecf2fb;
    font-family: sans-serif;
    font-size: 20px;
    border-radius: 10px;
    background: #4a8ac6;
    margin-bottom: 5px;
}

.chat-img {
    height: 200px;
    width: auto;
    border-radius: 10px;
}

.teacher-chat>div:first-child>div::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    /* 箭头靠右边 */
    top: 10px;
    right: -10px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #4a8ac6;
}

.del {
    padding: 10px;
    color: #000;
    font-size: 20px;
    line-height: 20px;
    user-select: none;
    cursor: pointer;
    transition: opacity .2s;
    opacity: 0;
}

.box:hover+.del,
.del:hover {
    opacity: 1;
}
</style>