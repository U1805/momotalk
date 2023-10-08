<script setup lang="ts">
import { store } from '@/assets/storeUtils/store'
import { play } from '@/assets/chatUtils/play'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const storyLng = ref<string>('MessageTW')

const playMomotalk = (confirm: boolean) => {
    play(confirm, store.storyKey, store.storyFile, storyLng.value)
    let newQuery = JSON.parse(JSON.stringify(route.query))
    delete newQuery.id
    router.replace({ query: newQuery })
}
</script>

<template>
    <div v-if="store.showDialog" class="dialog-mask flex-center">
        <div class="dialog-box">
            <div class="dialog-header">{{ $t('dialogTitle') }}</div>
            <p class="dialog-content">{{ $t('dialogContent') }}</p>
            <p class="dialog-content">
                <label>{{ $t('selectStory') }}</label>
                <select v-model="store.storyFile">
                    <option v-for="(momotalk, index) in store.storyList" :key="index">
                        {{ momotalk }}
                    </option></select
                ><br />
                <label>{{ $t('selectLanguage') }}</label>
                <select v-model="storyLng">
                    <option selected>MessageTW</option>
                    <option>MessageEN</option>
                    <option>MessageJP</option>
                </select>
            </p>
            <div class="dialog-footer">
                <button class="button dialog-confirm" @click="playMomotalk(true)">
                    {{ $t('confirm') }}
                </button>
                <button class="button dialog-confirm" @click="playMomotalk(false)">
                    {{ $t('cancel') }}
                </button>
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
    border: 1px solid #ebedf0;
    color: $pink;
    &:active {
        background-color: #f2f3f5;
    }
}
</style>
