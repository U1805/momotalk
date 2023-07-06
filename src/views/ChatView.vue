<script setup lang="ts">
import ProfileIcon from '../components/icons/IconProfile.vue'
import SendIcon from '../components/icons/IconSend.vue'
import ImageIcon from '../components/icons/IconImage.vue'
import CloseIcon from '../components/icons/IconClose2.vue'
import HeartIcon from '../components/icons/IconHeart.vue'
import Student from '../components/Student.vue'
import Story from '../components/Story.vue'
import Sensei from '../components/Sensei.vue'
</script>

<template>
  <main class="talk-wrapper">
    <div class="talk-list">
      <div v-for="talk in talkHistory">
        <Sensei v-if="talk.name=='sensei'" :talks="talk" @deleteTalk="deleteTalkId"></Sensei>
        <Story v-else-if="talk.name=='story'" :talks="talk" @deleteTalk="deleteTalkId"></Story>
        <Student v-else :talks="talk" @deleteTalk="deleteTalkId"></Student>
      </div>
    </div>

    <div class="add">
      <div class="input-bar">
        <div class="sticker" >
          <div v-if="selected==0" @click="showSticker()"><ProfileIcon style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
          <div v-else-if="selected==1" @click="showSticker()" style="background-color: #fed5de;"><HeartIcon style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
          <div v-else-if="typeof selected != 'number'"  @click="showSticker()" class="item" style="padding: 0px;margin:0px">
            <img :src="selected.avatar">
          </div>
        </div>
        <input class="text" placeholder="Aa" v-model="text">
        <div class="photo">
          <ImageIcon style="fill: currentColor;color:rgb(189, 189, 189); width: 40px;height: 40px;"/>
        </div>
        <div class="send">
          <SendIcon @click="sendText()" style="fill: currentColor;color:rgb(189, 189, 189); width: 40px;height: 40px;"/>
        </div>
      </div>
      <div class="selected-student">
        <div class="item-sensei"  @click="selectStudent(0)">
          <div><ProfileIcon style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
        </div>
        <div class="item-heart" @click="selectStudent(1)">
          <div><HeartIcon style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
        </div>
        <div class="item" v-for="(student,index) in selectList"  @click="selectStudent(student)">
          <img :src="student.avatar">
          <CloseIcon class="delete-button" @click="deleteStudent(index);"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { myStudent, Talk } from 'src/interface'

export default defineComponent({
  props:{
    student: null,
    studentId: null
  },
  data(){
    return{
      selectList:[] as myStudent[],
      selected: 0 as myStudent|number,
      talkHistory: [] as Talk[],
      talkId: 0,
      text: "" as string
    }
  },
  watch:{
    student(newStudent){
      if(this.selectList.indexOf(newStudent) == -1){
        this.selectList.push(newStudent);
        // console.log(this.selectList)
      }
    }
  },
  methods:{
    deleteStudent(index:number){
      this.selectList.splice(index, 1)
    },
    selectStudent(student:myStudent|number){
      this.selected = student
      this.text = ''
    },
    showSticker(){
      console.log("now show the stickers")
    },
    sendText(){
      if(this.text.length==0) return;

      // 新建对话
      var name:string = "sensei";
      var avatar:string|null = null;
      
      if(typeof this.selected != 'number'){ // 学生说话
        name = this.selected.name;
        avatar = this.selected.avatar;
      }
      else if(this.selected == 1){ // 羁绊剧情
        name = "story";
      }
      var newTalk:Talk = {
        'id': this.talkId++,
        'name': name,
        'avatar': avatar,
        'talks': [this.text]
      }

      if(this.talkHistory.length==0) // 聊天记录为空
        this.talkHistory.push(newTalk);
      else{
        if(name == this.talkHistory[this.talkHistory.length-1].name) // 和上一条同一说话人
          this.talkHistory[this.talkHistory.length-1].talks.push(this.text);
        else // 不同说话人
          this.talkHistory.push(newTalk);
      }
      console.log(this.talkHistory)
      this.text = ''
    },
    deleteTalkId(id:number){
      var index = this.talkHistory.findIndex((talk:Talk)=>{return talk.id==id})
      this.talkHistory.splice(index, 1)
    }
  }
})
</script>

<style scoped>
@import '../assets/css/chat.css';
</style>
