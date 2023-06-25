<script setup>
import ListHeader from './ListCard/ListHeader.vue'
import ListItem from './ListCard/ListItem.vue'
import data from '../assets/student.json'
</script>

<template>
    <div id="listcard">
        <ListHeader></ListHeader>
        <dev id="list" v-for="(item, key, index) in data">
            <span @click="changeItem(index)" 
                :class="{active_item:categoryIndex==index}" class="t12" 
            >
                <ListItem 
                    :avatar="item.avatar" 
                    :name="item.name" 
                    :bio="item.bio" 
                />
            </span>
        </dev>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryIndex: 0,
            data: data
        }
    },
    methods:{
        changeItem(index){
            this.categoryIndex = index
        }
    }
}
</script>

<style scoped>
#listcard{
    background-color: #f3f7f8;
}
#list{
    display: flex;
    flex-direction: column;
}
.t12{
    width: 100%;
}
.active_item{
    background-color: #dce5ec;
}
</style>