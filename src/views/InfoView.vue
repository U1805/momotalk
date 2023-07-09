<script setup lang="ts">
import BirhdayIcon from '@/components/icons/IconBirhday.vue'
</script>

<template>
  <main class="parent">
    <div v-if="student.Avatar">
      <div class="avatar"><img :src="student.Avatar" /></div>
      <div class="div2">{{ student.Name }}</div>
      <div class="div3">{{ student.Bio }}</div>
      <div class="div4">
        <BirhdayIcon style="margin-left: 10px" />
        <p style="margin-right: 10px">{{ student.Birthday }}</p>
      </div>
    </div>
    <div v-else style="display: flex; align-items: center; justify-content: center">请选择学生</div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    student: null
  }
})
</script>

<style scoped lang="scss">
.parent {
  @include center;
  @include font-heavy(20px);
  color: $font-grey;

  > div {
    display: grid;
    grid: {
      template-columns: 1fr 1fr 1fr;
      template-rows: 160px repeat(3, 40px);
    }
  }
}

.avatar {
  grid-area: 1 / 2 / 2 / 3;
  @include center;

  img {
    @include circle(150px);
  }
}

.div2,
.div3,
.div4 {
  @include center;
  @include font-light(23px);
}

.div2 {
  grid-area: 2 / 2 / 3 / 3;
  color: $font-black;
}

.div3 {
  grid-area: 3 / 2 / 4 / 3;
  color: $font-grey;
  white-space: nowrap;
}

.div4 {
  grid-area: 4 / 2 / 5 / 3;
  @include center;
  @include font-light(20px);
  color: #5d7c8c;
  border: #c2cfd6 2px solid;
  border-radius: 20px;
  place-self: center;
  width: fit-content;
  margin: 5px auto auto;
  padding: 4px;
}
</style>
