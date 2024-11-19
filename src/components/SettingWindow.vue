<script setup lang="ts">
import { store } from '@/assets/storeUtils/store'
import { importJson, exportJson } from '@/assets/storeUtils/file'
import { importCard, exportCard } from '@/assets/chatUtils/play'
import IconClose from './icons/IconClose.vue';
import IconGithub from './icons/IconGithub.vue'
import IconLog from './icons/IconLog.vue';

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
@import '@/assets/css/dialog.scss';
@import '@/assets/css/setting-window.scss';
</style>
