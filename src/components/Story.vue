<template>
    <div class="story-chat" v-for="talk in talklist">
      <!-- <div class="box" contenteditable v-for="talk in talklist">{{ talk }}</div> -->
        <div class="title"><span></span>羁绊剧情</div><hr/>
        <div class="content" contenteditable>前往{{ talk }}的羁绊剧情</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props:{
    talklist: null
  },
})
</script>

<style scoped>
.story-chat {
    margin: 5px 25px 5px 50px;
    display: flex;
    flex-direction: column;
    background-color: #ffedf1;
    border-radius: 10px;
    border: 1px solid rgba(131, 131, 131, 0.568);
    height: 130px;
}
.title-bar{
    height: 40px;
}
.title{
    height: 50px;
    display: flex;
    align-items: center;
    font-family: sans-serif;
    font-size: 20px;
}
.title>span{
    height: 20px;
    width: 2px;
    background-color: #fc8e9f;
    margin: 0px 5px 0px 10px;
    display: inline;
}
hr{
    width: 95%;
    height: 1px;
    margin: 0px;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>