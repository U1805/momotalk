<script setup lang="ts">
import ProfileIcon from '@/components/icons/IconProfile.vue'
import SendIcon from '@/components/icons/IconSend.vue'
import ImageIcon from '@/components/icons/IconImage.vue'
import CloseIcon from '@/components/icons/IconClose2.vue'
import HeartIcon from '@/components/icons/IconHeart.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import Student from '@/components/Student.vue'
import Story from '@/components/Story.vue'
import Sensei from '@/components/Sensei.vue'
</script>

<template>
    <main class="talk-wrapper">
        <!-- 主界面 -->
        <div class="talk-list" ref="talkRef">
            <div v-for="talk in talkHistory">
                <Sensei v-if="talk.name == 'sensei'" :talks="talk" @deleteTalk="deleteTalkId"></Sensei>
                <Story v-else-if="talk.name == 'story'" :talks="talk" @deleteTalk="deleteTalkId"></Story>
                <Student v-else :talks="talk" @deleteTalk="deleteTalkId"></Student>
            </div>
        </div>

        <div class="add">
            <div class="input-bar">
                <!-- 输入 -->
                <div class="sticker">
                    <div v-if="selected == 0" @click="showSticker()"> <ProfileIcon class="profile-icon" /> </div>
                    <div v-else-if="selected == 1" @click="showSticker()" style="background-color: #fed5de;"> <HeartIcon class="heart-icon" /> </div>
                    <div v-else-if="typeof selected != 'number'" @click="showSticker()" style="padding: 0px;margin:0px;" class="item"> <img :src="selected.Avatar" /> </div>
                </div>
                <input class="text" placeholder="Aa" v-model="text" @keyup.enter="sendText">
                <div class="photo">
                    <ImageIcon onclick="document.querySelector('#upload-btn').click()" class="image-icon" />
                    <input id="upload-btn" type="file" @change="File" accept="image/*" />
                </div>
                <div class="send">
                    <SendIcon @click="sendText()" class="send-icon" />
                </div>
            </div>
            <div class="g-wrap">
                <!-- 身份选择 -->
                <div class="g-scroll">
                    <div class="g-content selected-student">
                        <div class="item-sensei" @click="selectStudent(0)">
                            <div> <ProfileIcon class="profile-icon" /> </div>
                        </div>
                        <div class="item-heart" @click="selectStudent(1)">
                            <div> <HeartIcon class="heart-icon" /> </div>
                        </div>
                        <div class="item" v-for="(student, index) in selectList" @click="selectStudent(student)">
                            <img :src="student.Avatar">
                            <CloseIcon class="delete-button" @click="deleteStudent(index);" />
                        </div>
                        <div class="item-sensei" onclick="document.querySelector('#add-btn').click()">
                            <AddIcon class="image-icon" />
                            <input id="add-btn" type="file" @change="addStudent" accept="image/*" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { myStudent, Talk } from '../interface'

export default defineComponent({
    props: {
        student: null,
        studentId: null
    },
    data() {
        return {
            selectList: [] as myStudent[],
            selected: 0 as myStudent | number,
            talkHistory: [] as Talk[],
            talkId: 0,
            text: "" as string
        }
    },
    watch: {
        student(newStudent) {
            if (this.selectList.indexOf(newStudent) == -1) {
                this.selectList.push(newStudent);
                this.selectStudent(newStudent);
                // console.log(this.selectList)
            }
        }
    },
    methods: {
        deleteTalkId(id: number) {
            // 删除对话中的一个头像
            var index:number = this.talkHistory.findIndex((talk: Talk) => { return talk.id == id })
            this.talkHistory.splice(index, 1)
        },
        deleteStudent(index: number) {
            // 从列表中删除学生
            this.selectList.splice(index, 1)
        },
        selectStudent(student: myStudent | number) {
            // 选择学生添加到列表
            this.selected = student
        },
        showSticker() {
            console.log("now show the stickers")
        },
        sendText() {
            if (this.text.length == 0) return;

            // 新建对话
            var name: string = "sensei";
            var avatar: string | null = null;

            if (typeof this.selected != 'number') { // 学生说话
                name = this.selected.Name;
                avatar = this.selected.Avatar;
            }
            else if (this.selected == 1) { // 羁绊剧情
                name = "story";
            }
            var newTalk: Talk = {
                'id': this.talkId++,
                'name': name,
                'avatar': avatar,
                'talks': [this.text]
            }

            if (this.talkHistory.length == 0) // 聊天记录为空
                this.talkHistory.push(newTalk);
            else {
                if (name == this.talkHistory[this.talkHistory.length - 1].name) // 和上一条同一说话人
                    this.talkHistory[this.talkHistory.length - 1].talks.push(this.text);
                else // 不同说话人
                    this.talkHistory.push(newTalk);
            }
            console.log(this.talkHistory)
            this.text = ''
        },
        File(evt: Event) {
            if (this.selected == 1) return; // story card 不能插入图片
            var btn: HTMLInputElement = (evt.target as HTMLInputElement)!;
            var file = btn.files![0];

            if (file.size > 1048576) { // 太大容易卡
                alert("目前不建议上传大于 1MB 的图片哦！");
                return;
            }
            const reader = new FileReader();
            var that = this;
            reader.addEventListener("load", () => {
                that.text = reader.result as string; // 将图像文件转换为 base64 字符串
                that.sendText();
            });
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        addStudent(evt: Event) {
            // TODO 解耦出返回图片的功能
            // 添加自定义学生到列表
            if (this.selected == 1) return;
            var btn: HTMLInputElement = (evt.target as HTMLInputElement)!;
            var file = btn.files![0];

            if (file.size > 1048576) { // 太大容易卡
                alert("目前不建议上传大于 1MB 的图片哦！");
                return;
            }
            const reader = new FileReader();
            var that = this;
            reader.addEventListener("load", () => {
                var image = reader.result as string;
                var name = prompt("请输入自定义角色名")!;
                if(name == null) return;
                while(name.length == 0) name = prompt("请输入自定义角色名")!;
                var student:myStudent = {
                    'Id': 0,
                    'Avatar': image,
                    'Birthday': "",
                    'Bio': "",
                    'Name': name,
                    }
                that.selectList.push(student);
            });
            if (file) {
                reader.readAsDataURL(file);
            }
        },
    }
})
</script>

<style scoped lang="scss">
@import '../assets/css/chat.scss';

#upload-btn, #add-btn {
    display: none;
}

.profile-icon,
.heart-icon {
    fill: currentColor;
    color: #fff;
    width: 75%;
    height: 75%;
    cursor: pointer;
}

.image-icon,
.send-icon {
    fill: currentColor;
    color: rgb(189, 189, 189);
    width: 40px;
    height: 40px;
    cursor: pointer;
}

// 横向滚动 https://codepen.io/Chokcoco/pen/PoRLpGO
.g-wrap {
    position: relative;
    margin: auto;
    width: 100%;
    height: calc($chatfooter-height/2);
    cursor: pointer;
}

.g-scroll {
    position: absolute;
    left: -60px;
    width: 60px;
    height: calc(($view-width - $sider-width)/2);
    transform-origin: 100% 0;
    transform: rotate(-90deg);
    overflow: scroll;
    overflow-x: hidden;
}

.g-content {
    position: absolute;
    top: 0;
    left: 60px;
    width: fit-content;
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
    transform-origin: 0 0;
    box-sizing: border-box;
    transform: rotate(90deg);
}

/* hide scrollbar */
::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar-button {
    display: none;
}
</style>
