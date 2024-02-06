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
        store.theme = 'momotalk';
    var fullScreen = store.fullScreen ? 'full-screen' : 'not-full-screen'
    document.body.className = store.theme + ' ' + fullScreen
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
                <li @click="showPage(2)" class="page-btn" id="page-2">{{ $t('experimental') }}</li>
            </ul>
            <div class="featured">
                <div class="page">
                    <p class="dialog-content">
                        <h2>{{ $t('renderStyle') }}</h2>
                        <label class="radio"><input type="radio" value="momotalk" name="style" v-model="store.theme"
                                @change="store.setData();changeTheme();" />momotalk</label>
                        <label class="radio"><input type="radio" value="yuzutalk" name="style" v-model="store.theme"
                                @change="store.setData();changeTheme();" />yuzutalk</label>
                        <label class="checkbox"><input type="checkbox" value="false" v-model="store.fullScreen" 
                            @change="store.setData();changeTheme();"/>{{ $t('fullScreen') }}</label>
                        <h2>{{ $t('draggable') }}</h2>
                        <label class="checkbox"><input type="checkbox" value="false" v-model="store.draggable" 
                            @change="store.setData()"/>{{ $t('disableDrag') }}</label>
                        <h2>{{ $t('importAndExport') }}</h2>
                        <label>{{ $t('exportDialog') }}: </label>
                        <button @click="exportJson">{{ $t('exportButton') }}</button><br />
                        <label>{{ $t('importDialog') }}: </label>
                        <button @click="importJson">{{ $t('importButton') }}</button><br />
                    </p>
                    <p class="dialog-content">
                        <a href="https://github.com/U1805/momotalk" class="icon-github" title="GITHUB"><IconGithub /></a>
                        <a href="https://github.com/U1805/momotalk/blob/main/docs/update_log.md" class="icon-log" title="LOG"><IconLog /></a>
                    </p>
                </div>
                <div class="page">
                    <p class="dialog-content">
                        <label>{{ $t('warnSave') }}</label><br />
                        <h2>{{ $t('sharedFile') }}</h2>
                        <span style="display: flex;justify-content: space-evenly">
                        <button class="button-half" @click="exportCard">{{ $t('exportButton') }}</button><br />
                        <button class="button-half" @click="importCard">{{ $t('importButton') }}</button><br />
                        </span>
                        <h2>{{ $t('chatToArona') }}</h2>
                        <label>{{ $t('warnCost') }}</label><br />
                        <label>API Key: </label>
                        <input type="text" placeholder="sk-xxxxxxxxxxxxx" v-model="store.apikey" @change="store.setData"><br />
                        <label>{{ $t('host') }}: </label>
                        <input type="text" v-model="store.host" @change="store.setData">
                        <label>{{ $t('clickToStart') }}</label>
                    </p>
                    <p class="dialog-content">
                        <a href="https://github.com/U1805/momotalk" class="icon-github" title="GITHUB"><IconGithub /></a>
                        <a href="https://github.com/U1805/momotalk/blob/main/docs/update_log.md" class="icon-log" title="LOG"><IconLog /></a>
                        <a href="./Arona" title="talk to A.R.O.N.A"><img class="arona-chat" src="/Arona.webp"></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/dialog.scss';
@import '@/assets/css/setting-window.scss';
</style>
