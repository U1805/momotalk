<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MomoIcon from './components/icons/IconMomo.vue'
import CloseIcon from './components/icons/IconClose.vue'
import StudentIcon from './components/icons/IconStudent.vue'
import MessageIcon from './components/icons/IconMessage.vue'
import DownloadIcon from './components/icons/IconDownload.vue'
import ListIcon from './components/icons/IconList.vue'
import data from './assets/student.json'
</script>

<template>
  <div id="root">
    <div id="header">
      <div class="left">
        <MomoIcon style="height: 25px;padding-left: 20px;" />
        <span class="header-title">MomoTalk</span>
        <RouterLink to="/help"><button class="help">?</button></RouterLink>
      </div>
      <div class="right">
        <CloseIcon style="height: 40px;" />
      </div>
    </div>

    <div id="sidebar">
      <div class="up">
        <div :class="{active_sidebar:currentSidebar==0}" @click="selectSidebar(0)">
          <RouterLink to="/"><StudentIcon /></RouterLink>
        </div>
        <div :class="{active_sidebar:currentSidebar==1}" @click="selectSidebar(1)">
          <RouterLink to="/chat"><MessageIcon /></RouterLink>
        </div>
      </div>
      <div class="down">
        <div> <DownloadIcon /> </div>
      </div>
    </div>

    <div id="listcard">
      <div id="listheader">
        <div class="listheader1">未読メッセジ(4)</div>
        <div class="listheader2"><span>未読</span><p></p></div>
        <div class="listheader3"><ListIcon /></div>
      </div>
      <div id="listbody">
        <div class="list-item" 
          v-for="(item, key) in data" 
          :key="key" 
          :class="{active: key==currentStudent}"
          @click="selectStudent(item, key)">

            <div class="avatar"><img :src="item.avatar"/> </div>
            <span class="name">{{ item.name}}</span>
            <span class="bio">{{ item.bio }}</span>
            <div class="mark"></div>
        </div>
        <hr />
      </div>
    </div>
    <RouterView id="chatcard" :student="student" :studentId="currentStudent"/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props:{

  },
  data() {
    return {
      student: {},
      currentStudent: "",
      currentSidebar: 0
    }
  },
  methods: {
    selectStudent(item:any, key:string){
      this.student = item
      this.currentStudent = key
      // console.log(this.student)
    },
    selectSidebar(key:number){
      this.currentSidebar = key
      // console.log(this.currentSidebar)
    }
  }
})
</script>


<style scoped>
#root {
  display: grid;
  grid-template-columns: 100px repeat(2, 1fr);
  grid-template-rows: 70px calc(70vh - 70px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(45, 35, 66, 0.2) 0 3px 6px;
}




#header {
  grid-area: 1 / 1 / 2 / 6;
  background-color: rgb(252, 150, 171);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left {
  display: flex;
  align-items: center;
  padding: 9px;
  font-family: sans-serif;
}

.right {
  display: flex;
  align-items: center;
  padding: 25px;
}

.header-title {
  color: #fff;
  font-size: 32px;
  padding: 10px;
  font-family: sans-serif;
  font-weight: 1000;
}

.help {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 28px;
  width: 28px;
  box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px;
  color: rgb(252, 150, 171);
  font-size: 24px;
  font-family: sans-serif;
}





#sidebar {
  grid-area: 2 / 1 / 6 / 2;
  background-color: #4b5a6f;
}

#sidebar, .up, .down {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.up>div, .down>div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  opacity: 0.5;
}

.active_sidebar, .up>div:hover, .down>div:hover {
  opacity: 1 !important;
  background-color: #68788f;
}






#listcard {
  grid-area: 2 / 2 / 3 / 3;
  background-color: #f3f7f8;
  
}

#listheader {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 75px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border-bottom: 2px solid #e1e7ec ;
}

.listheader1 {
  display: flex;
  align-items: center;
  padding-left: 20px;
  grid-area: 1 / 1 / 2 / 6;

  font-family: sans-serif;
  font-size: 25px;
  font-weight: 1000;
  color: #2a323e;
}

.listheader2 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 6 / 2 / 9;
}

.listheader3 {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 9 / 2 / 11;
}

.listheader2, .listheader3{
  background: #fff;
  border-width: 7px;
  border-color: #fff;
  border-style: solid;
  border-radius: 5px;
  box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px;
  margin: 15px -10px;
  width: 90%;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transform: skew(-15deg);
  overflow: hidden;
}

.listheader2>span {
  display: inline-block;
  transform: skew(15deg);
  font-size: 20px;
  font-weight: 1000;
  color: #2a323e;
}

.listheader2>p {
  background: #4b6a82;
  width: 30px;
  height: 30px;
  top: -15px;
  right: -15px;
  position: absolute;
  transform: rotate(45deg);
}

#listbody {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(70vh - 144px);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE 和 Edge */
  scrollbar-width: none;  /* Firefox */
}
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
#listbody::-webkit-scrollbar {
    display: none;
}


.active {
  background-color: #dce5ec;
}

.list-item{
    display: grid;
    grid-template-columns: 75px 15px 1fr 15px 75px;
    grid-template-rows: repeat(2, 35px);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    width: 100%;
    padding: 15px 25px ;
}
.list-item:hover{
    background-color: #dce5ec;
}
.avatar{ grid-area: 1 / 1 / 3 / 2; }
.name { 
    grid-area: 1 / 3 / 2 / 4; 
    font-family: sans-serif;
    font-size: 25px;
    font-weight: 1000;
    color: #2a323e;
}
.bio { 
    grid-area: 2 / 3 / 3 / 4; 
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 1000;
    color: #6e7782;
    overflow: hidden;
    text-overflow:ellipsis; white-space: nowrap;
}
.mark { grid-area: 1 / 5 / 3 / 6; }
img{
    height: 75px;
    width: 75px;
    border-radius: 50%;
    overflow: hidden;
}
hr{
    width: 95%;
    background-color: #e1e7ec;
    border: none;
    height: 1px;
}




#chatcard {
  grid-area: 2 / 3 / 3 / 4;
  background-color: #ffffff;
}
</style>
