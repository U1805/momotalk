<script setup>
import Student from './ChatCard/Student.vue'
import Story from './ChatCard/Story.vue'
import Sensei from './ChatCard/Sensei.vue'
</script>

<template>
    <div id="chatcard">
        <Student></Student>
        <Student></Student>
        <Sensei></Sensei>
        <Story></Story>
    </div>
</template>

<style scoped>
#chatcard{
    background-color: #ffffff;
}
</style>