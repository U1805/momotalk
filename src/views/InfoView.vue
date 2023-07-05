<template>
  <main class="parent">

  <div v-if="student.avatar">
    <div class="avatar"><img :src="student.avatar" /></div>
    <div class="div2"> {{ student.name }} </div>
    <div class="div3"> {{ student.bio }} </div>
    <div class="div4"> 🎂 {{ student.birthday }} </div>
  </div>
  <div v-else style="display: flex;align-items: center;justify-content: center;">
   请选择学生
  </div>
  </main>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props:{
    student: null
  }
})
</script>

<style scoped>

.parent{
  display: flex;
  align-items: center;
  justify-content: center;  
  font-size: 20px;
  font-weight: 1000;
  color: #878b92;
}
.parent>div {
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 160px repeat(3, 40px);
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.avatar{
  grid-area: 1 / 2 / 2 / 3; 
  display: flex;
  justify-content: center;
}
.avatar>img{
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.div2, .div3, .div4{
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  font-size: 23px;
  font-weight: 1000;
}
.div2 { 
  grid-area: 2 / 2 / 3 / 3;
  color: #2a323e;
}
.div3 { 
  grid-area: 3 / 2 / 4 / 3; 
  color: #878b92;
  white-space:nowrap;
}
.div4 { 
  grid-area: 4 / 2 / 5 / 3; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5d7c8c;
  border: #c2cfd6 3px solid;
  border-radius: 20px;
  font-size: 20px;
  width: 140px;
  font-weight: 500;
  place-self: center;
}

</style>