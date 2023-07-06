<template>
    <div class="student-chat">
        <div class="avatar">
            <img :src="talks.avatar" />
        </div>
        <div class="name"> {{ talks.name }} </div>
        <div class="container">
            <div v-for="(talk, index) in talks.talks" style="display: flex; flex-direction:row;">
                <div class="box" contenteditable>{{ talk }}</div>
                <span class="del" @click="deleteTalk(index)">×</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        talks: null
    },
    data() {
        return {
            showButton: false as boolean,
            showButtonIndex: 0
        }
    },
    methods: {
        deleteTalk(index: number) {
            this.talks.talks.splice(index, 1)
            if (this.talks.talks.length == 0) {
                this.$emit('deleteTalk', this.talks.id)
            }
        }
    }
})
</script>

<style scoped>
.student-chat {
    display: grid;
    grid-template-columns: 75px 15px 1fr;
    grid-template-rows: 35px 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    padding: 10px 50px 10px 25px;
}

.avatar {
    grid-area: 1 / 1 / 3 / 2;
}

img {
    margin-top: 5px;
    height: 75px;
    width: 75px;
    border-radius: 50%;
    overflow: hidden;
}

.name {
    grid-area: 1 / 3 / 2 / 3;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #2a323e;
    user-select: none;
}

.container {
    grid-area: 2 / 3 / 3 / 3;
}

.box {
    position: relative;
    padding: 5px 10px;
    width: fit-content;
    height: fit-content;
    color: #ecf2fb;
    font-family: sans-serif;
    font-size: 20px;
    border-radius: 10px;
    background: #4b5a6d;
    margin-bottom: 5px;
}


.container>div:first-child>div::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    /* 箭头靠左边 */
    top: 10px;
    left: -10px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #4b5a6d;
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