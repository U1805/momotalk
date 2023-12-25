<script setup lang="ts">
import MomoIcon from './components/icons/IconMomo.vue'
import CloseIcon from './components/icons/IconClose.vue'
import StudentIcon from './components/icons/IconStudent.vue'
import MessageIcon from './components/icons/IconMessage.vue'
import DownloadIcon from './components/icons/IconDownload.vue'
import ListIcon from './components/icons/IconList.vue'
import ResetIcon from './components/icons/IconReset.vue'
import SearchIcon from './components/icons/IconSearch.vue'
import AddIcon from './components/icons/IconAdd.vue'
import LanguageIcon from './components/icons/IconLanguage.vue'
import Dialog from '@/components/DialogWindow.vue'
</script>

<template>
    <Dialog></Dialog>
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
                <CloseIcon class="icon close" />
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
                <div style="cursor: pointer" @click="changeLanguage" title="Switch Language">
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
                    :class="{ active: item === student }"
                    @click="selectStudent(item)"
                >
                    <div class="list-item__avatar" @click="updateAvatar(item)">
                        <img :src="item.Avatar[item.cnt]" />
                        <AddIcon
                            class="icon list-item__avatar--multi"
                            v-if="item.Avatar.length > 2"
                        />
                    </div>
                    <span class="list-item__name">{{ item.Name }}</span>
                    <span class="list-item__bio">{{ item.Bio }}</span>
                    <div
                        class="list-item__mark"
                        v-if="item.School"
                        @click="searchSchool = searchSchool === item.School ? '' : item.School"
                        @click.stop=""
                    >
                        <img :src="getSchaleSchoolIcon(item.School)" />
                    </div>
                </div>
            </div>
        </div>
        <RouterView id="chatcard" :student="student" @deactive="deactiveStudent()" />
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import i18n from '@/locales/i18n'
import { myStudent } from '@/assets/utils/interface'
import { getStudents, getSchaleSchoolIcon } from '@/assets/utils/request'
import { download } from '@/assets/imgUtils/download'
import { store } from '@/assets/storeUtils/store'
import { selectList } from '@/assets/storeUtils/selectList'
import { talkHistory } from '@/assets/storeUtils/talkHistory'

store.getData()

// student data
const database = ref<myStudent[][]>(await getStudents(store.language))
const dataDisplayIndex = ref<number>(0)
const dataDisplay = ref<myStudent[]>(database.value[dataDisplayIndex.value])
watch(dataDisplayIndex, async (flag: number) => {
    dataDisplay.value = database.value[flag]
})
const switchStudentList = () => {
    dataDisplayIndex.value = (dataDisplayIndex.value + 1) % database.value.length
    deactiveStudent()
}

// search and filter
const searchText = ref<string>('')
const searchSchool = ref<string>('')
watch(
    () => [searchText.value, searchSchool.value],
    () => {
        // https://www.cnblogs.com/caozhenfei/p/14882122.html
        let reg_text = new RegExp(searchText.value.toLowerCase())
        let reg_school = new RegExp(searchSchool.value)
        dataDisplay.value = database.value[dataDisplayIndex.value].filter((item) => {
            if (reg_school.test(item.School)) {
                if (reg_text.test(item.Name.toLowerCase())) return item
                for (let nickname of item.Nickname) {
                    if (reg_text.test(nickname.toLowerCase())) return item
                }
            }
        })
        deactiveStudent()
    }
)

// item in list
const student = ref<myStudent | null>(null)
const selectStudent = (item: any) => {
    student.value = item
}
const deactiveStudent = () => {
    student.value = null
}
const updateAvatar = (item: myStudent) => {
    item.cnt = (item.cnt + 1) % item.Avatar.length
    var index = selectList.getStudentIndexById(item.Id)
    selectList.selectList[index].cnt = item.cnt
    selectList.setData()
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

// shortcuts
document.onkeyup = (e) => {
    if (e.key === '/') {
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