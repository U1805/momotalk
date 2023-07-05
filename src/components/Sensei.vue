<template>
    <div class="teacher-chat">
            <div class="box" contenteditable>测试文字测试</div>
            <div class="box" contenteditable>测试文字测试</div>
    </div>
</template>
    
<style scoped>
.teacher-chat {
    padding: 10px 25px 10px 50px;
    display: flex;
    flex-direction: column;
    align-items: end;
}

.box {
    position: relative;
    padding: 5px 10px;
    width: fit-content;
    height: fit-content;
    color: #ecf2fb;
    font-family: sans-serif;
    font-size: 20px;
    border-radius: 10px;
    background: #4a8ac6;
    margin-bottom: 5px;
}

.box:first-child::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    /* 箭头靠右边 */
    top: 10px;
    right: -10px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #4a8ac6;
}
</style>