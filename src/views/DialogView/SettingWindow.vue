<script setup lang="ts">
import { store } from '@/assets/storeUtils/store'
import { importJson, exportJson } from '@/assets/storeUtils/file'
import { importCard, exportCard } from '@/assets/chatUtils/play'
import IconClose from '@/components/icons/IconClose.vue';
import IconGithub from '@/components/icons/IconGithub.vue'
import IconLog from '@/components/icons/IconLog.vue';

const showPage = (num: number) => {
    const pageElements = document.querySelectorAll('.page');
    pageElements.forEach((element) => {
        element.setAttribute('style', `transform: translateX(${(num - 1) * -100}%);`);
    });    
    const btnElements = document.querySelectorAll('.page-btn');
    btnElements.forEach((element) => {
        element.classList.remove('active');
    });
    const selectedPage = document.getElementById(`page-${num}`);
    if (selectedPage) selectedPage.classList.add('active');
}

const changeTheme = () => {
    if (store.theme !== 'momotalk' && store.theme !== 'yuzutalk') 
        store.theme = 'momotalk'
    if (store.zoom < 0.5 || store.zoom >1.5)
        store.zoom = 1
    var fullScreen = store.fullScreen ? 'full-screen' : 'not-full-screen'
    document.body.className = store.theme + ' ' + fullScreen
    document.body.style.setProperty('--zoom', store.zoom.toString())
}
</script>

<template>
    <div v-if="store.showSettingDialog" class="dialog-mask flex-center" @click="store.showSettingDialog = false">
        <div class="dialog-box" @click.stop="">
            <div class="dialog-header">
                {{ $t('setting') }}
                <button class="icon-button">
                    <IconClose @click="store.showSettingDialog = false"></IconClose>
                </button>
            </div>
            <ul class="pagination">
                <li @click="showPage(1)" class="page-btn active" id="page-1">{{ $t('basicSetting') }}</li>
                <li>&nbsp;/&nbsp;</li>
                <li @click="showPage(2)" class="page-btn" id="page-2">{{ $t('sharefile') }}</li>
            </ul>
            <div class="featured">
                <div class="page">
                    <div class="dialog-content">
                        <h2>{{ $t('renderStyle') }}</h2>
                        <span style="display: flex; justify-content: space-around">
                        <label class="radio"><input type="radio" value="momotalk" name="style" v-model="store.theme"
                                @change="store.setData();changeTheme();" />momotalk</label>
                        <label class="radio"><input type="radio" value="yuzutalk" name="style" v-model="store.theme"
                                @change="store.setData();changeTheme();" />yuzutalk</label>
                        </span>
                        <span style="display: flex; justify-content: space-around">
                        <label class="range">{{ $t('zoom') }}
                            <input type="range" min="0.5" max="1.5" step="0.01" v-model="store.zoom"
                            @change="store.setData();changeTheme();"/>{{ Number(store.zoom).toFixed(2) }}</label>
                        </span>
                        <label class="checkbox"><input type="checkbox" value="false" v-model="store.fullScreen" 
                            @change="store.setData();changeTheme();"/>{{ $t('fullScreen') }}</label>
                        <h2>{{ $t('draggable') }}</h2>
                        <label class="checkbox"><input type="checkbox" value="false" v-model="store.draggable" 
                            @change="store.setData()"/>{{ $t('disableDrag') }}</label>
                        
                    </div>
                    <div class="dialog-content">
                        <a href="https://github.com/U1805/momotalk" class="icon-github" title="GITHUB"><IconGithub /></a>
                        <a href="https://github.com/U1805/momotalk/blob/main/docs/update_log.md" class="icon-log" title="LOG"><IconLog /></a>
                    </div>
                </div>
                <div class="page">
                    <div class="dialog-content">
                        <h2>{{ $t('importAndExport') }}</h2>
                        <span style="display: flex;justify-content: space-evenly">
                        <button class="button-half" @click="exportJson">{{ $t('exportButton') }}</button><br />
                        <button class="button-half" @click="importJson">{{ $t('importButton') }}</button><br />
                        </span>
                        <h2>{{ $t('sharedFile') }}</h2>
                        <span style="display: flex;justify-content: space-evenly">
                        <button class="button-half" @click="exportCard">{{ $t('exportButton') }}</button><br />
                        <button class="button-half" @click="importCard">{{ $t('importButton') }}</button><br />
                        </span>
                    </div>
                    <div class="dialog-content">
                        <a href="https://github.com/U1805/momotalk" class="icon-github" title="GITHUB"><IconGithub /></a>
                        <a href="https://github.com/U1805/momotalk/blob/main/docs/update_log.md" class="icon-log" title="LOG"><IconLog /></a>
                    </div>
                </div>
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
    width: 420px;
    border-radius: 10px;
    overflow: hidden;
    min-height: 250px;
}


.featured {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;

    .page {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 0 24px;
        width: 100%;
        flex-shrink: 0;
        transition: transform cubic-bezier(0.18, 0.89, 0.32, 1.28) 512ms;
    }
}

.pagination {
    display: flex;
    list-style: none;
    font-size: 14px;
    line-height: 1;
    padding: 1.5rem 1.5rem 0 1.5rem;

    .page-btn {
        position: relative;
        display: block;
        text-decoration: none;
        &.active{
            font-weight:bold;
        }
    }
}

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
    padding: 24px 32px 0px;

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

        &.button-half{
            width: 40%;
            margin: 10px 0;
            color: $grey-active;
            background-color: white;
        }
    }

    input {
        @include font-light(12px);
        width: 100%;
        border-radius: 0.5rem;
        line-height: 2rem;
        border: 1px solid $grey;
    }

    .icon-github,
    .icon-log {
        font-size: 35px;
        margin-right: 20px;
        fill: $grey;
    }

    .arona-chat {
        height: 35px;
        filter: grayscale(30%);
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

.radio {
    display: inline-flex;
    align-items: center;
    margin-right: 20px;

    input {
        width: auto;
        margin: 5px;
    }
}

.checkbox{
    display: inline-flex;   
    align-items: center;
    input{
        width: auto;
        margin: 5px;
    }
}

.range{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    input{
        width: 60%;
        margin: 5px;
    }
}
</style>
