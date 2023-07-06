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
        <RouterLink to="/"> <StudentIcon /> </RouterLink>
        <RouterLink to="/chat"> <MessageIcon /> </RouterLink>
      </div>
      <div class="down">
        <div> <DownloadIcon @click="download"/> </div>
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
import { domtoimage } from '@/assets/utils/dom-to-image'

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
    },
    download(){
      var node = document.getElementsByClassName("talk-list")[0];
      domtoimage.toJpeg(node, { quality: 0.95 })
        .then(function (dataUrl:string) {
            var link = document.createElement('a');
            link.download = 'download.jpeg';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error:Error) {
              console.error("oops, something went wrong!", error);
          });;
    }
  },
})
</script>


<style scoped lang="scss">
@import './assets/css/app.scss';

</style>
