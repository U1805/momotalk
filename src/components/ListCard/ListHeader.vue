<script setup>
import ListIcon from '../icons/IconList.vue'
</script>

<template>
    <div id="listheader">
        <div class="div1"><div class="unread-text">未読メッセジ(4)</div></div>
        <div class="div2"><button class="sort-button"><span>未読</span><p class="mark"></p></button></div>
        <div class="div3"><button class="sort-button"><span><ListIcon/></span></button></div>
    </div>
</template>

<style scoped>
#listheader {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 75px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    border-bottom: 2px solid #e1e7ec;
    border-top:0px;  
    border-left:0px;  
    border-right:0px;  
}

.div1 { 
    display: flex;
    align-items: center;
    padding-left: 20px;
    grid-area: 1 / 1 / 2 / 6; 
}
.div2 { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: 1 / 6 / 2 / 9; 

}
.div3 { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 15px;
    grid-area: 1 / 9 / 2 / 11; 
}

.unread-text{
    font-family: sans-serif;
    font-size: 25px;
    font-weight: 1000;
    color: #2a323e;
}
.div2>.sort-button{
    background: #fff;
    border-width: 7px;
    border-color: #fff;
    border-style: solid ;
    border-radius: 5px;
    box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px;
    margin: 15px;
    width: 90%;
    height: 100%;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transform: skew(-15deg);
    overflow:hidden;
}

.mark{
  background: #4b6a82;
  width: 30px;
  height: 30px;
  top: -15px;
  right: -15px;
  position:absolute;
  transform:rotate(45deg);
}

.div3>.sort-button{
    background: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px;
    margin: 15px;
    width: 90%;
    height: 100%;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transform: skew(-15deg);
}

span {
    display: inline-block;
    transform: skew(15deg);
    font-size: 20px;
    font-weight: 1000;
    color: #2a323e;
}
</style>