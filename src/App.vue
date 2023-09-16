<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
</script>

<template>
    <div id="root">
        <div id="header">
            <div id="header__left">
                <MomoIcon class="icon momo" />
                <span id="header__title">MomoTalk</span>
                <!-- <RouterLink to="/help"><button class="help">?</button></RouterLink> -->
                <a href="https://github.com/U1805/momotalk/blob/main/How-to-use.md"
                    ><button class="help">?</button></a
                >
            </div>
            <div id="header__right">
                <button @click="mode = 1 - mode">test feat</button>
                <CloseIcon class="icon close" />
            </div>
        </div>

        <div id="sidebar">
            <div id="sidebar__up">
                <RouterLink to="/">
                    <StudentIcon class="icon info" />
                </RouterLink>
                <RouterLink to="/chat" @click="releaseStudent">
                    <MessageIcon class="icon message" />
                </RouterLink>
            </div>
            <div id="sidebar__down">
                <div style="cursor: pointer" @click="store.resetData()">
                    <ResetIcon class="icon reset" />
                </div>
                <div style="cursor: pointer" @click="download">
                    <DownloadIcon class="icon download" />
                </div>
                <div style="cursor: pointer" @click="changeLanguage">
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
                        ref="searchBox"
                    />
                </div>
                <div class="student-list__button" @click="exchangeList">
                    <ListIcon class="icon list" />
                </div>
            </div>
            <div id="listbody">
                <div
                    class="list-item"
                    v-for="(item, index) in dataDisplay"
                    :key="index"
                    :class="{ active: index === currentStudent }"
                    @click="selectStudent(item, index)"
                >
                    <div class="list-item__avatar" @click="update(item)">
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
                        @click="filterScool(item.School)"
                        @click.stop=""
                    >
                        <img :src="getSchaleSchoolIcon(item.School)" />
                    </div>
                </div>
            </div>
        </div>
        <RouterView id="chatcard" :student="student" :mode="mode" @releaseStudent="releaseStudent"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { domtoimage } from '@/assets/utils/dom-to-image'
import { store } from '@/assets/utils/store'
import { myStudent } from '@/assets/utils/interface'
import { getStudents } from '@/assets/utils/request'
import i18n from '@/assets/locales/i18n'

export default defineComponent({
    props: {},
    data() {
        return {
            store,
            student: null,
            currentStudent: -1,
            searchScool: '',
            searchText: '',
            database: [] as myStudent[][], // [data1, data2]
            dataDisplay: [] as myStudent[], // data1
            dataDisplayIndex: -1,
            currentLng: 'cn',
            mode: 0 // view mode when 1 
        }
    },
    methods: {
        selectStudent(item: any, index: number) {
            this.student = item
            this.currentStudent = index
        },
        releaseStudent() {
            this.student = null
        },
        download() {
            var node = document.getElementsByClassName('talk-list')[0]
            // 隐藏截图的滚动条
            node.setAttribute('style', 'overflow-y:hidden')
            var width = node.clientWidth
            var height = node.scrollHeight
            if (width && height) {
                domtoimage
                    .toPng(node, { width, height })
                    .then(function (dataUrl: string) {
                        const link = document.createElement('a')
                        link.download = `Momotalk-${Date.now()}.png`
                        link.href = dataUrl
                        link.click()
                    })
                    .catch(function (error: Error) {
                        console.error('oops, screenshot went wrong!', error)
                    })
                    .finally(function () {
                        // 恢复滚动功能
                        node.setAttribute('style', 'overflow-y:scroll')
                    })
            }
        },
        exchangeList() {
            this.dataDisplayIndex = (this.dataDisplayIndex + 1) % this.database.length
            // 刷新选中状态
            this.releaseStudent()
        },
        update(item: myStudent) {
            item.cnt = (item.cnt + 1) % item.Avatar.length
            var index = this.store.selectList.findIndex((ele) => ele.Id === item.Id)
            this.store.selectList[index].cnt = item.cnt
            this.store.setData()
        },
        getSchaleSchoolIcon(school: string) {
            return `https://schale.gg/images/schoolicon/School_Icon_${school.toUpperCase()}_W.png`
        },
        filterScool(school: string) {
            this.searchScool = this.searchScool === '' ? school : ''
            let reg = new RegExp(this.searchScool)
            this.dataDisplay = this.database[this.dataDisplayIndex].filter((item) => {
                if (reg.test(item.School)) return item
            })
            // 刷新选中状态
            this.releaseStudent()
        },
        async changeLanguage() {
            const languageList = i18n.global.availableLocales
            const currentLngIdx = languageList.findIndex((ele) => ele === this.currentLng)
            this.currentLng = languageList[(currentLngIdx + 1) % languageList.length]
            i18n.global.locale = this.currentLng as any
            this.database = await getStudents(this.currentLng)
            this.dataDisplay = this.database[this.dataDisplayIndex]
            this.releaseStudent()
        }
    },
    watch: {
        searchText() {
            // https://www.cnblogs.com/caozhenfei/p/14882122.html
            let text = this.searchText.toLowerCase()
            let reg = new RegExp(text)
            this.dataDisplay = this.database[this.dataDisplayIndex].filter((item) => {
                if (reg.test(item.Name)) return item
                else if (item.Nickname)
                    // 遍历别名
                    for (let nickname of item.Nickname)
                        if (reg.test(nickname.toLowerCase())) return item
            })
            this.releaseStudent()
        },
        dataDisplayIndex(flag) {
            this.dataDisplay = this.database[flag]
        }
    },
    mounted: function () {
        document.onkeyup = (e) => {
            if (e.key === '/') {
                var box = this.$refs.searchBox as HTMLInputElement
                box.focus()
            }
        }
        this.$nextTick(async () => {
            this.database = await getStudents('cn')
            this.dataDisplayIndex = 0
        })
    }
})
</script>

<style scoped lang="scss">
@import './assets/css/app.scss';
@import './assets/css/icons.scss';

@media screen and (max-width: 1150px) {
    #root {
        grid-template-columns: 100vw 100vw;
        grid-template-rows: $header-height 1fr $sider-width;
        height: 100vh;
        scroll-snap-type: x mandatory;
        overflow-x: scroll;
    }

    #header {
        grid-area: 1/1/1/1;
        position: sticky;
        left: 0;
    }

    #sidebar {
        grid-area: 3/1/3/1;
        background-color: $grey;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &__up,
        &__down {
            display: flex;
        }
    }

    #listcard {
        grid-area: 2/1/2/2;
        #listbody {
            height: calc(100vh - $header-height - $listheader-height - $sider-width);
        }
        scroll-snap-align: center;
    }

    #chatcard {
        grid-area: 2/2/4/3;
        background-color: white;
        scroll-snap-align: center;
    }
}
</style>
