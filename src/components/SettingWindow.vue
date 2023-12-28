<script setup lang="ts">
import { store } from '@/assets/storeUtils/store'
import { importJson, exportJson } from '@/assets/utils/file'
import IconClose from './icons/IconClose.vue';
import IconGithub from './icons/IconGithub.vue'
</script>

<template>
    <div v-if="store.showSettingDialog" class="dialog-mask flex-center">
        <div class="dialog-box">
            <div class="dialog-header">
                {{ $t('setting') }} 
                <button class="icon-button">
                    <IconClose @click="store.showSettingDialog = false"></IconClose>
                </button>
            </div>
            <p class="dialog-content">
                <label>{{ $t('exportDialog') }}</label>
                <button @click="exportJson">{{ $t('exportButton') }}</button><br />
                <label>{{ $t('importDialog') }}</label>
                <button @click="importJson">{{ $t('importButton') }}</button>
            </p>
            <span class="dialog-content icon-github">
                <a href="https://github.com/U1805/momotalk"><IconGithub/></a>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/dialog.scss';

.dialog-header {
    @include font-heavy(20px);
    padding-top: 20px;
    display: flex;
    padding: 16px 32px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}

.dialog-content {
    @include font-light(12px);
    white-space: pre-wrap;
    line-height: 35px;
    padding: 24px 32px 51px;

    button {
        @include font-light(12px);
        width: 100%;
        border-radius: 0.5rem;
        line-height: 2rem;
        color: rgb(255, 255, 255);
        border: 1px solid $grey;
        background-color: $grey-active;
        cursor: pointer;

        &:active {
            transform: scale(0.95);
        }
    }
}

.icon-button {
    @include center;
    border: 0;
    background-color: transparent;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.15s ease;

    svg {
        width: 24px;
        height: 24px;
        stroke: $font-black;
    }

    &:hover,
    &:focus {
        background-color: #dfdad7;
    }
}
.icon-github {
    font-size: 20px;
}
</style>
