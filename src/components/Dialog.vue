<script setup lang="ts">
import { store } from '@/assets/utils/store';
import { momotalks } from '@/assets/utils/momotalks';
defineProps({
    show: Boolean,
    title: String,
    message: String
})

const emit = defineEmits(["resp"]);
</script>

<template>
    <div v-if="show" class="dialog-mask flex-center">
        <div class="dialog-box">
            <div class="dialog-header">🎈这里是实验性功能</div>
            <p class="dialog-content">点击`确定`开启Momotalk播放功能<br/>💥此功能会清空对话记录</p>
            <p class="dialog-content">
                <select v-model="store.storyFile">
                    <option v-for="momotalk in momotalks" :selected="momotalk.selected">{{momotalk.value}}</option>
                </select><br/>
                <select v-model="store.storyLng">
                    <option selected>MessageTW</option>
                    <option>MessageEN</option>
                    <option>MessageJP</option>
                </select>
            </p>
            <div class="dialog-footer">
                <button class="button dialog-confirm" @click="emit('resp',true)">确定</button>
                <button class="button dialog-confirm" @click="emit('resp',false)">取消</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    @include center;
}

.dialog-box {
    user-select: none;
    background: #fff;
    width: 400px;
    border-radius: 10px;
    overflow: hidden;
    .dialog-header {
        @include center;
        @include font-heavy(20px);
        padding-top: 20px;
    }
    .dialog-content {
        padding: 5px 20px 20px 20px;
        @include font-light(12px);
        text-align: center;
        white-space: pre-wrap;
    }
    .dialog-footer {
        display: flex;
    }
}

.button {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border: 1px solid #EBEDF0;
    color: $pink;
    &:active {
        background-color: #f2f3f5;
    }
}
</style>