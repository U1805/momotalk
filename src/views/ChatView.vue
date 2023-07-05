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
        <Sensei v-if="talk.name=='sensei'" :talklist="talk.talks"></Sensei>
        <Story v-else-if="talk.name=='story'" :talklist="talk.talks"></Story>
        <Student v-else :student="talk.name" :talklist="talk.talks" :avatar="talk.avatar"></Student>
      </div>
      <Story></Story>
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
        <div class="item-sensei">
          <div><ProfileIcon @click="selectStudent(0)" style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
        </div>
        <div class="item-heart">
          <div><HeartIcon @click="selectStudent(1)" style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
        </div>
        <div class="item" v-for="student in selectList">
          <img :src="student.avatar" @click="selectStudent(student)">
          <CloseIcon @click="deleteStudent(student.name);"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface myStudent{
  'avatar': string,
  'name': string,
  'bio': string
}

interface Talk{
  'name': string,
  'avatar': string|null,
  'talks': string[]
}

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
    deleteStudent(name:string){
      var index = this.selectList.findIndex((student:myStudent)=>{return student.name==name})
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
    }
  }
})
</script>

<style scoped>
.talk-wrapper{
  height: 100%;
}
.talk-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(70vh - 190px);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE 和 Edge */
  scrollbar-width: none;  /* Firefox */
}
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
.talk-list::-webkit-scrollbar {
    display: none;
}




.add{
  height: 120px;
  width: 100%;
}
.input-bar{
  height: 60px;
  width: 100%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.sticker, .send, .photo {
    padding: 8px;
    display: inline-flex;
    border: 0px;
}
.sticker>div, .item-sensei>div, .item-heart>div{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(189, 189, 189);
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-heart>div{
  background-color: #fed4de;
}
.text{
    font-size: 20px;
    color: #666;
    padding: 5px 10px;
    margin: 0 8px;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #aaa;
}



.selected-student{
  height: 60px;
  width: 100%;
  background-color: #f6fbff;
  display: flex;
  align-items: center;
  overflow-x: scroll;
-ms-overflow-style: none;  /* IE 和 Edge */
  scrollbar-width: none;  /* Firefox */
}
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
.selected-student::-webkit-scrollbar {
    display: none;
}
.item, .item-sensei, .item-heart{
    position: relative;
    height: 50px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 10px 15px 10px 10px;
    margin: 5px;
    user-select: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
}
.item>img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.item>svg, .item-heart>svg{
  height: 1em;
  width: 1em;
  font-size: 22px;
  cursor: pointer;
  margin: 0px -5px 0px 10px;
  fill: currentColor;
  color: rgba(0, 0, 0, 0.26);;
}
</style>
