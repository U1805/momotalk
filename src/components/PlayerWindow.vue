<script setup lang="ts">
import { store } from '@/assets/storeUtils/store'
import { play } from '@/assets/chatUtils/play'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const storyLng = ref<string>('MessageJP')

const playMomotalk = async (confirm: boolean) => {
    let res = await play(confirm, store.storyKey, store.storyFile, storyLng.value)
    let newQuery = JSON.parse(JSON.stringify(route.query))
    delete newQuery.id
    router.replace({ query: newQuery })
    if (!res) router.push({ name: 'info' })
}
</script>

<template>
    <div v-if="store.showPlayerDialog" class="dialog-mask flex-center">
        <div class="dialog-box">
            <div class="dialog-header">{{ $t('dialogTitle') }}</div>
            <p class="dialog-content">{{ $t('dialogContent') }}</p>
            <p class="dialog-content">
                <label>{{ $t('selectStory') }}</label>
                <select v-model="store.storyFile">
                    <option v-for="(momotalk, index) in Object.keys(store.storyList)" :key="index">
                        {{ momotalk }}
                    </option>
                </select><br />
                <label>{{ $t('selectLanguage') }}</label>
                <select v-model="storyLng">
                    <option v-for="(lng, index) in store.storyList[store.storyFile]" :key="index">
                        {{ lng }}
                    </option>
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
@import '@/assets/css/dialog.scss';

.dialog-header {
    @include center;
    @include font-heavy(20px);
    padding-top: 20px;
}
.dialog-content {
    @include font-light(12px);
    padding: 5px 20px 20px 20px;
    text-align: center;
    white-space: pre-wrap;
}
.dialog-footer {
    display: flex;
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
