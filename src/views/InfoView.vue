<script setup lang="ts">
import BirhdayIcon from '@/components/icons/IconBirhday.vue'
import PlayIcon from '@/components/icons/IconPlay.vue'
</script>

<template>
    <main class="student-info">
        <div v-if="student">
            <RouterLink class="student-info__play" :to="{ path: '/chat', query: { id: student.Id } }">
                <PlayIcon class="icon play"/>
            </RouterLink>
            <div class="student-info__avatar">
                <img :src="student.Avatar[student.cnt]" />
            </div>
            <div class="student-info__name">{{ student.Name }}</div>
            <div class="student-info__bio">{{ student.Bio }}</div>
            <div class="student-info__birthday">
                <BirhdayIcon style="margin-left: 10px" />
                <p style="margin-right: 10px">{{ student.Birthday }}</p>
            </div>
        </div>
        <div v-else style="display: flex; align-items: center; justify-content: center">
            {{ $t('selectInfo') }}
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '@/assets/css/icons.scss'

export default defineComponent({
    props: {
        student: null
    }
})
</script>

<style scoped lang="scss">
.student-info {
    @include center;
    @include font-heavy(20px);
    color: $font-grey;

    > div {
        display: grid;
        margin: 20px 40px;
        grid: {
            template-rows: 0px 160px  40px minmax(40px, 1fr) 55px;
        }
    }

    &__play{
        grid-row: 1 / 2;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    &__avatar {
        grid-row: 2 / 3;
        @include center;

        img {
            @include circle(150px);
        }
    }

    &__name {
        grid-row: 3 / 4;
        color: $font-black;
        @include center;
        @include font-light(23px);
    }

    &__bio {
        grid-row: 4 / 5;
        color: $font-grey;
        word-wrap: break-word;
        text-align: center;
        @include font-light(23px);
    }

    &__birthday {
        grid-row: 5 / 6;
        @include center;
        @include font-light(20px);
        color: #5d7c8c;
        border: #c2cfd6 2px solid;
        border-radius: 20px;
        place-self: center;
        width: fit-content;
        margin: 5px auto auto;
        padding: 4px;
    }
}
</style>
