<script setup>
import Student from './ChatCard/Student.vue'
import Story from './ChatCard/Story.vue'
import Sensei from './ChatCard/Sensei.vue'
</script>

<template>
    <div id="chatcard" :style="{ 'max-height': this.Height + 'px' }" style="overflow-y:scroll;">
        <Student></Student>
        <Sensei></Sensei>
        <Student></Student>
        <Student></Student>
        <!-- <Story></Story> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            Height: "",
        }
    },
    mounted() {
        this.Height = document.documentElement.clientHeight;
        window.onresize = () => {
            this.Height = document.documentElement.clientHeight;
        };
    },
}
</script>

<style scoped>
#chatcard {
    background-color: #ffffff;
}
</style>