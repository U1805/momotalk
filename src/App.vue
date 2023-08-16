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
</script>

<template>
    <div id="root">
        <div id="header">
            <div id="header__left">
                <MomoIcon class="icon momo" />
                <span id="header__title">MomoTalk</span>
                <!-- <RouterLink to="/help"><button class="help">?</button></RouterLink> -->
                <a href="https://github.com/U1805/momotalk/blob/main/README-zh.md"
                    ><button class="help">?</button></a
                >
            </div>
            <div id="header__right">
                <CloseIcon class="icon close" />
            </div>
        </div>

        <div id="sidebar">
            <div id="sidebar__up">
                <RouterLink to="/">
                    <StudentIcon class="icon info" />
                </RouterLink>
                <RouterLink to="/chat">
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
                    <div class="list-item__mark"></div>
                </div>
                
            </div>
        </div>
        <RouterView id="chatcard" :student="student"  @releaseStudent="releaseStudent"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { domtoimage } from '@/assets/utils/dom-to-image'
import { store } from '@/assets/utils/store'
import { myStudent } from '@/assets/utils/interface'
import { getStudents } from '@/assets/utils/getData'

export default defineComponent({
    props: {},
    data() {
        return {
            store,
            student: null,
            currentStudent: -1,
            searchText: '',
            database: [] as myStudent[][], // [data1, data2]
            dataDisplay: [] as myStudent[], // data1
            dataDisplayIndex: -1
        }
    },
    methods: {
        selectStudent(item: any, index: number) {
            this.student = item
            this.currentStudent = index
        },
        releaseStudent(){
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
                    for (let nickname of item.Nickname) if (reg.test(nickname.toLowerCase())) return item
            })
            // 刷新选中状态
            this.releaseStudent()
        },
        dataDisplayIndex(flag) {
            this.dataDisplay = this.database[flag]
        }
    },
    mounted() {
        ;(document.onkeyup = (e) => {
            if (e.key === '/') {
                var box = this.$refs.searchBox as HTMLInputElement
                box.focus()
            }
        }),
            this.$nextTick(async () => {
                this.database = await getStudents()
                this.dataDisplayIndex = 0
            })
    }
})
</script>

<style scoped lang="scss">
@import './assets/css/app.scss';
@import './assets/css/icons.scss';
</style>
