<script setup lang="ts">
import MomoIcon from './components/icons/IconMomo.vue'
import SettingIcon from './components/icons/IconSetting.vue'
import StudentIcon from './components/icons/IconStudent.vue'
import MessageIcon from './components/icons/IconMessage.vue'
import DownloadIcon from './components/icons/IconDownload.vue'
import ListIcon from './components/icons/IconList.vue'
import ResetIcon from './components/icons/IconReset.vue'
import SearchIcon from './components/icons/IconSearch.vue'
import LanguageIcon from './components/icons/IconLanguage.vue'
import PlayerDialog from '@/components/PlayerWindow.vue'
import SettingDialog from '@/components/SettingWindow.vue'
</script>

<template>
    <PlayerDialog></PlayerDialog>
    <SettingDialog></SettingDialog>
    <div id="root">
        <div id="header">
            <div id="header__left">
                <MomoIcon class="icon momo" />
                <span id="header__title">MomoTalk</span>
                <RouterLink to="/help" title="Help">
                    <button class="help">?</button>
                </RouterLink>
            </div>
            <div id="header__right">
                <SettingIcon class="icon setting" @click="store.showSettingDialog = true" />
            </div>
        </div>

        <div id="sidebar">
            <div id="sidebar__up">
                <RouterLink to="/" title="Info">
                    <StudentIcon class="icon info" />
                </RouterLink>
                <RouterLink to="/chat" @click="deactiveStudent" title="Chat">
                    <MessageIcon class="icon message" />
                </RouterLink>
            </div>
            <div id="sidebar__down">
                <div style="cursor: pointer" @click="store.resetData()" title="Reset">
                    <ResetIcon class="icon reset" />
                </div>
                <div style="cursor: pointer" @click="download" title="Download">
                    <DownloadIcon class="icon download" />
                </div>
                <div style="cursor: pointer" @click="changeLanguage" title="Switch Language" >
                    <LanguageIcon class="icon language" />
                </div>
            </div>
        </div>

        <div id="listcard">
            <div id="listcard__header">
                <div class="search-group">
                    <SearchIcon class="icon search-group__icon" />
                    <input
                        type="text"
                        placeholder="Type / to search"
                        class="search-group__text"
                        v-model="searchText"
                        id="searchBox"
                    />
                </div>
                <div
                    class="student-list__button"
                    @click="switchStudentList"
                    title="Switch Student List"
                >
                    <ListIcon class="icon list" />
                </div>
            </div>
            <div id="listbody">
                <div
                    class="list-item"
                    v-for="(item, index) in dataDisplay"
                    :key="index"
                    :class="{ active: item === studentSelected }"
                    @click="selectStudent(item)"
                >
                    <div
                        class="list-item__avatar"
                        @click.stop=""
                        @click="showAvatars(item)"
                    >
                        <img :src="item.Avatars[item.cnt]" />
                        <button
                            :class="item === studentShowAvatars ? 'minus' : 'add'"
                            v-if="item.Avatars.length > 2"
                        ></button>
                    </div>
                    <span class="list-item__name">{{ item.Name }}</span>
                    <span class="list-item__bio">{{ item.Bio }}</span>
                    <div
                        class="list-item__mark"
                        v-if="item.School"
                        @click.stop=""
                        @click=" searchSchool = searchSchool === item.School ? '' : item.School "
                    >
                        <img :src="getSchaleSchoolIcon(item.School)" />
                    </div>
                    <div
                        class="list-item__avatars"
                        @click.stop=""
                        v-show="item === studentShowAvatars"
                    >
                        <img
                            v-for="(avatar, index) in item.Avatars"
                            :src="avatar"
                            @click="selectAvatar(item, index)"
                        />
                    </div>
                </div>
            </div>
        </div>
        <RouterView id="chatcard" @deactive="deactiveStudent()" 
            :studentInfo="studentSelected" :student="student"/>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import i18n from '@/locales/i18n'
import { baseStudent, studentInfo } from '@/assets/utils/interface'
import { getStudents, getSchaleSchoolIcon } from '@/assets/utils/request'
import { download } from '@/assets/imgUtils/download'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { search } from './assets/utils/search'

store.getData()

// student data
const database = ref<studentInfo[][]>(await getStudents(store.language))
const dataDisplayIndex = ref<number>(0)
const dataDisplay = ref<studentInfo[]>(database.value[dataDisplayIndex.value])
watch(dataDisplayIndex, async (flag: number) => {
    dataDisplay.value = database.value[flag]
})
const switchStudentList = () => {
    dataDisplayIndex.value = (dataDisplayIndex.value + 1) % database.value.length
    searchText.value = ''
    searchSchool.value = ''
    deactiveStudent()
}

// search and filter
const searchText = ref<string>('')
const searchSchool = ref<string>('')
watch(
    () => [searchText.value, searchSchool.value],
    () => {
        dataDisplay.value = search(
            database.value[dataDisplayIndex.value],
            searchText.value,
            searchSchool.value
        )
        deactiveStudent()
    }
)

// item in list
const studentSelected = ref<studentInfo | null>(null)
const student = ref<baseStudent | null>(null)
const selectStudent = (item: studentInfo) => {
    studentSelected.value = item
    student.value = {
        Id: studentSelected.value.Id,
        Name: studentSelected.value.Name,
        Avatar: studentSelected.value.Avatars[studentSelected.value.cnt]
    }
}
const deactiveStudent = () => {
    student.value = null
}
// multi-avatar student
const studentShowAvatars = ref<studentInfo | null>(null)
const showAvatars = (item: any) => {
    if (studentShowAvatars.value !== item) studentShowAvatars.value = item
    else studentShowAvatars.value = null
}
const selectAvatar = (item:studentInfo, index: number) => {
    studentSelected.value = item
    studentSelected.value.cnt = index
    student.value = {
        Id: studentSelected.value.Id,
        Name: studentSelected.value.Name,
        Avatar: studentSelected.value.Avatars[studentSelected.value.cnt]
    }
}

// languages
const changeLanguage = async () => {
    const languageList = i18n.global.availableLocales
    const currentLngIdx = languageList.findIndex((ele) => ele === store.language)
    store.language = languageList[(currentLngIdx + 1) % languageList.length]
    i18n.global.locale = store.language as any
    database.value = await getStudents(store.language)
    dataDisplay.value = database.value[dataDisplayIndex.value]
    store.setData()
    deactiveStudent()
}

// theme
const changeTheme = () => {
    if (store.theme !== 'momotalk' && store.theme !== 'yuzutalk') 
        store.theme = 'momotalk'
    var fullScreen = store.fullScreen ? 'full-screen' : 'not-full-screen'
    document.body.className = store.theme + ' ' + fullScreen
}
changeTheme()

// shortcuts
document.onkeyup = (e) => {
    // 在输入框中不激活快捷键
    if (e.key === '/' && document.activeElement?.id !== 'textarea') {
        var box = document.getElementById('searchBox') as HTMLInputElement
        box.focus()
    }
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault()
        talkHistory.undo()
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
        e.preventDefault()
        talkHistory.redo()
    }
}
</script>

<style scoped lang="scss">
@import './app.scss';
@import '@/assets/css/icons.scss';

@import '@/assets/css/mobile.scss';
</style>
