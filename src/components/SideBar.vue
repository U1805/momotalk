<script setup>
import StudentIcon from './icons/IconStudent.vue'
import MessageIcon from './icons/IconMessage.vue'
import DownloadIcon from './icons/IconDownload.vue'
</script>

<template>
    <div id="sidebar">
        <div id="bar1">
            <div @click="changeItem(0)" :class="{active_sidebar:categoryIndex==0}"><StudentIcon /></div>
            <div @click="changeItem(1)" :class="{active_sidebar:categoryIndex==1}"><MessageIcon /></div>
        </div>
        <div id="bar2">
            <div><DownloadIcon /></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryIndex: 0
        }
    },
    methods:{
        changeItem(index){
            this.categoryIndex = index
        }
    }
}
</script>

<style>
#sidebar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #4b5a6f;
}
#bar1, #bar2{
    display: flex;
    flex-direction: column;
}
#bar1>div, #bar2>div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    opacity: 0.5;
}
.active_sidebar, #bar1>div:hover, #bar2>div:hover{
    opacity: 1!important;
    background-color: #68788f;
}
</style>