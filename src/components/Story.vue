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

<style scoped lang="scss">
.story-chat {
    margin: 5px 25px 5px 85px;
    display: flex;
    flex-direction: column;

    >div {
        display: grid;

        grid: {
            template-columns: 40px 1fr;
            template-rows: 1fr;
            column-gap: 0px;
            row-gap: 0px;
        }
    }

    &>div:hover span {
        opacity: 1;
    }
}

.del {
    grid-area: 1 / 1 / 2 / 2;
    padding: 10px;
    color: #000;
    font-size: 20px;
    line-height: 20px;
    user-select: none;
    cursor: pointer;
    transition: opacity .2s;
    opacity: 0;

    &:hover {
        opacity: 1;
    }
}

.box {
    grid-area: 1 / 2 / 2 / 3;
    position: relative;
    margin: 5px;
    display: flex;
    flex-direction: column;
    background-color: #ffedf1;
    border-radius: 10px;
    border: 1px solid $font-grey;
    height: 130px;
}

.title {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $font-grey;
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
    @include center;
    flex-direction: column;
}

button {
    background-color: $pink;
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
</style>