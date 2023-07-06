<template>
    <div class="story-chat">
        <div v-for="(talk, index) in talks.talks">
            <span class="del" @click="deleteTalk(index)">×</span>
            <div class="box">
                <div class="title"><span></span>羁绊剧情</div>
                <div class="content"><button><span contenteditable>{{ talk }}</span></button></div>
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
.story-chat {
    margin: 5px 25px 5px 125px;
    display: flex;
    flex-direction: column;
}

.box {
    position: relative;
    margin: 5px;
    display: flex;
    flex-direction: column;
    background-color: #ffedf1;
    border-radius: 10px;
    border: 1px solid rgba(131, 131, 131, 0.568);
    height: 130px;
}

.title {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(131, 131, 131, 0.568);
    font-family: sans-serif;
    font-size: 20px;
}

.title>span {
    height: 20px;
    width: 2px;
    background-color: #fc8e9f;
    margin: 0px 5px 0px 10px;
    display: inline;
}

.content {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

button {
    background-color: #fc8c9d;
    border: none;
    color: white;
    padding: 15px;
    width: 90%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 10px;
    font-family: sans-serif;
    font-size: 20px;
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


.del:hover,.box:hover+.del {
  opacity: 1;
}

</style>