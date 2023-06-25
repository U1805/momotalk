<script setup>
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import ListCard from './components/ListCard.vue'
import ChatCard from './components/ChatCard.vue'
</script>

<template>
    <div id="root">
        <Header></Header>
        <SideBar></SideBar>
        <ListCard></ListCard>
        <ChatCard></ChatCard>
    </div>
</template>

<style scoped>
#root{
    display: grid;
    grid-template-columns: 100px repeat(2, 1fr);
    grid-template-rows: 70px calc(70vh - 70px);;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(45, 35, 66, 0.2) 0 3px 6px;
}
#header{ grid-area: 1 / 1 / 2 / 6; }
#sidebar{ grid-area: 2 / 1 / 6 / 2; }
#listcard{ grid-area: 2 / 2 / 3 / 3; }
#chatcard{ grid-area: 2 / 3 / 3 / 4; }
</style>
