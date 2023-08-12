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
</script>

<template>
    <div id="root">
        <div id="header">
            <div class="left">
                <MomoIcon class="icon momo" />
                <span class="header-title">MomoTalk</span>
                <!-- <RouterLink to="/help"><button class="help">?</button></RouterLink> -->
                <a href="https://github.com/U1805/momotalk/blob/main/README-zh.md"
                    ><button class="help">?</button></a
                >
            </div>
            <div class="right">
                <CloseIcon class="icon close" />
            </div>
        </div>

        <div id="sidebar">
            <div class="up">
                <RouterLink to="/">
                    <StudentIcon class="icon info" />
                </RouterLink>
                <RouterLink to="/chat">
                    <MessageIcon class="icon message" />
                </RouterLink>
            </div>
            <div class="down">
                <div style="cursor: pointer" @click="store.resetData()">
                    <ResetIcon class="icon reset" />
                </div>
                <div style="cursor: pointer" @click="download">
                    <DownloadIcon class="icon download" />
                </div>
            </div>
        </div>

        <div id="listcard">
            <div id="listheader">
                <div class="group">
                    <SearchIcon class="icon search" />
                    <input
                        placeholder="Type / to search"
                        type="text"
                        class="search-text"
                        v-model="searchText"
                        ref="searchBox"
                    />
                </div>
                <div class="search-button" @click="exchangeList">
                    <ListIcon class="icon list" />
                </div>
            </div>
            <div id="listbody">
                <div
                    class="list-item"
                    v-for="(item, index) in dataDisplay"
                    :key="index"
                    :class="{ active: index == currentStudent }"
                    @click="selectStudent(item, index)"
                >
                    <div>
                        <div class="avatar" v-for="(avatar, idx) in item.Avatar" @click="update(item)">
                            <img :src="avatar" v-if="idx == item.cnt" />
                        </div>
                    </div>
                    <span class="name">{{ item.Name }}</span>
                    <span class="bio">{{ item.Bio }}</span>
                    <div class="mark"></div>
                </div>
                <hr />
            </div>
        </div>
        <RouterView id="chatcard" :student="student" :studentId="currentStudent" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { domtoimage } from '@/assets/utils/dom-to-image'
import data from '@/assets/student.json'
import data_ from '@/assets/student2.json'
import { store } from '@/assets/utils/store'
import { myStudent } from './assets/utils/interface'

export default defineComponent({
    props: {},
    data() {
        return {
            store,
            student: {},
            currentStudent: -1,
            database: [data, data_],
            searchText: '',
            dataDisplay: data,
            dataFlag: 0
        }
    },
    methods: {
        selectStudent(item: any, index: number) {
            this.student = item
            // this.store.pushStudent(item)
            this.currentStudent = index
        },
        download() {
            var node = document.getElementsByClassName('talk-list')[0]
            node.setAttribute('style', 'overflow-y:hidden') // 隐藏截图的滚动条
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
                        node.setAttribute('style', 'overflow-y:scroll') // 恢复滚动功能
                    })
            }
        },
        search() {
            // https://www.cnblogs.com/caozhenfei/p/14882122.html
            let text = this.searchText.toLowerCase()
            let reg = new RegExp(text)
            this.dataDisplay = this.database[this.dataFlag].filter((item) => {
                if (reg.test(item.Name)) return item
                else if (item.Nickname)
                    // 遍历别名
                    for (let nickname of item.Nickname) if (reg.test(nickname.toLowerCase())) return item
            })
        },
        exchangeList() {
            this.dataFlag = (this.dataFlag + 1) % this.database.length
            this.dataDisplay = this.database[this.dataFlag]
        },
        update(item: myStudent) {
            item.cnt = (item.cnt + 1) % item.Avatar.length
            for (var selectItem of this.store.selectList) {
                if (selectItem.Id == item.Id) selectItem.cnt = item.cnt
            }
            this.store.setData()
        }
    },
    watch: {
        searchText() {
            this.search()
        }
    },
    mounted() {
        document.onkeyup = (e) => {
            if (e.key == '/') {
                ;(this.$refs.searchBox as HTMLInputElement).focus()
            }
        }
    }
})
</script>

<style scoped lang="scss">
@import './assets/css/app.scss';
@import './assets/css/icons.scss';
</style>
