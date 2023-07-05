<script setup lang="ts">
import ProfileIcon from '../components/icons/IconProfile.vue'
import SendIcon from '../components/icons/IconSend.vue'
import ImageIcon from '../components/icons/IconImage.vue'
import CloseIcon from '../components/icons/IconClose2.vue'
import Student from '../components/Student.vue'
// import Story from './ChatCard/Story.vue'
import Sensei from '../components/Sensei.vue'
</script>

<template>
  <main class="talk-wrapper">
    <div class="talk-list">
      <Student></Student>
      <Sensei></Sensei>
      <Student></Student>
      <Student></Student> 
    <!-- <Story></Story>-->
    </div>
    <div class="add">
      <div class="input-bar">
        <button class="sticker">
          <div><ProfileIcon style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
        </button>
        <input class="text" placeholder="Aa">
        <button class="photo">
          <ImageIcon style="fill: currentColor;color:rgb(189, 189, 189); width: 40px;height: 40px;"/>
        </button>
        <button class="send">
          <SendIcon style="fill: currentColor;color:rgb(189, 189, 189); width: 40px;height: 40px;"/>
        </button>
      </div>
      <div class="selected-student">
        <div class="item-sensei">
          <div><ProfileIcon style="fill: currentColor;color:#fff; width: 75%;height: 75%;"/></div>
        </div>
        <div class="item">
          <img src="https://schale.gg/images/student/collection/Student_Portrait_Aru_Collection.webp">
          <CloseIcon/>
        </div>
      </div>
    </div>
  </main>
</template>

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
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    border: 0px;
}
.sticker>div, .item-sensei>div{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(189, 189, 189);
  display: flex;
  align-items: center;
  justify-content: center;
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
.item, .item-sensei{
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
.item>svg{
  height: 1em;
  width: 1em;
  font-size: 22px;
  cursor: pointer;
  margin: 0px -5px 0px 10px;
  fill: currentColor;
  color: rgba(0, 0, 0, 0.26);;
}
</style>
