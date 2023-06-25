<script setup>
import MomoIcon from './icons/IconMomo.vue'
import CloseIcon from './icons/IconClose.vue'
</script>

<template>
    <div id="header">
        <div class="left">
            <MomoIcon style="height: 25px;padding-left: 20px;"/>
            <span class="header-title">MomoTalk</span>
            <button class="help">
                <p class="text">?</p>
            </button>
        </div>
        <div class="right">
            <CloseIcon style="height: 40px;"/>
        </div>
    </div>
</template>

<style>
#header{
    background-color: rgb(252, 150, 171);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.left{
    display: flex;
    align-items: center;
    padding: 9px;
    font-family: "Concert One", sans-serif;
}
.right{
    display: flex;
    align-items: center;
    padding: 25px;
}
.header-title{
    color: #fff;
    font-size: 32px;
    padding: 10px;
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
}

.help .text {
  color: rgb(252, 150, 171);
  font-size: 24px;
  font-family: "Concert One", sans-serif;
}
</style>