<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MomoIcon from './components/icons/IconMomo.vue'
import CloseIcon from './components/icons/IconClose.vue'
import StudentIcon from './components/icons/IconStudent.vue'
import MessageIcon from './components/icons/IconMessage.vue'
import DownloadIcon from './components/icons/IconDownload.vue'
import ListIcon from './components/icons/IconList.vue'
</script>

<template>
    <div id="root">
        <div id="header">
            <div class="left">
                <MomoIcon style="height: 25px;padding-left: 20px;" />
                <span class="header-title">MomoTalk</span>
                <RouterLink to="/help"><button class="help">?</button></RouterLink>
            </div>
            <div class="right">
                <CloseIcon style="height: 40px;" />
            </div>
        </div>

        <div id="sidebar">
            <div class="up">
                <RouterLink to="/"> <StudentIcon /> </RouterLink>
                <RouterLink to="/chat"> <MessageIcon /> </RouterLink>
            </div>
            <div class="down">
                <div style="cursor: pointer;"  @click="download"> <DownloadIcon /> </div>
            </div>
        </div>

        <div id="listcard">
            <div id="listheader">
                <input class="search-text" type="text" placeholder="搜索"
                    v-model="searchText"  
                    @keyup.enter="search">
                <div class="search-button" @click="search">
                    <ListIcon />
                </div>
            </div>
            <div id="listbody">
                <div class="list-item" 
                    v-for="(item, index) in database" 
                    :index="index"
                    :class="{ active: index == currentStudent }" 
                    @click="selectStudent(item, index)">

                    <div class="avatar"><img :src="item.Avatar" /> </div>
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
import data from './assets/student.json'

export default defineComponent({
    props: {

    },
    data() {
        return {
            student: {},
            currentStudent: -1,
            currentSidebar: 0,
            database: data,
            searchText: ""
        }
    },
    methods: {
        selectStudent(item: any, index: number) {
            this.student = item
            this.currentStudent = index
            // console.log(this.student)
        },
        selectSidebar(key: number) {
            this.currentSidebar = key
            // console.log(this.currentSidebar)
        },
        download() {
            var node = document.getElementsByClassName("talk-list")[0];
            node.setAttribute("style", "overflow-y:hidden"); // 隐藏截图的滚动条
            var width = node.clientWidth;
            var height = node.scrollHeight;
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
                        node.setAttribute("style", "overflow-y:scroll"); // 恢复滚动功能
                    })
            }

        },
        search() { // https://www.cnblogs.com/caozhenfei/p/14882122.html
            let text = this.searchText.toLowerCase()
            let reg = new RegExp(text)
            this.database = data.filter((item) => {
                if(reg.test(item.Name))
                    return item
                else if (item.Nickname) // 遍历别名
                    for(let nickname of item.Nickname)
                        if (reg.test(nickname.toLowerCase()))
                            return item
            })
        }
    },
})
</script>


<style scoped lang="scss">
@import './assets/css/app.scss';

</style>
@/components/utils/dom-to-image