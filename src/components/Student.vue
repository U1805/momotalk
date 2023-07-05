<template>
    <div class="student-chat">
        <div class="avatar">
            <img :src="avatar" />
        </div>
        <div class="name"> {{ student }} </div>
        <div class="container">
            <div class="box" contenteditable v-for="talk in talklist">{{ talk }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props:{
    student: null,
    avatar: null,
    talklist: null
  },
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
    margin-top: 13px;
    height: 75px;
    width: 75px;
    border-radius: 50%;
    overflow: hidden;
}

.name {
    grid-area: 1 / 3 / 2 / 3;
    font-family: sans-serif;
    font-size: 25px;
    font-weight: 700;
    color: #2a323e;
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


.box:first-child::after {
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
}</style>