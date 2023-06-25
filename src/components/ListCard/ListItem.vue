<template>
    <div class="list-item">
        <div class="avatar">
            <img :src="url"/>
        </div>
        <span class="name">{{ name }}</span>
        <span class="bio">{{ bio }}</span>
        <div class="mark"></div>
        
    </div>
    <hr />
</template>

<script>
export default {
  props: ['avatar','name','bio'],
  data() {
    return {
        url: "https://schale.gg/images/student/collection/Student_Portrait_"+this.avatar+"_Collection.webp",
    }
  }
}
</script>

<style scoped>
.list-item{
    /* display: flex;
    align-items: center; */
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
</style>