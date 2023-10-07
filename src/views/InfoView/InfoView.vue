<script setup lang="ts">
import BirhdayIcon from '@/components/icons/IconBirhday.vue'
import PlayIcon from '@/components/icons/IconPlay.vue'
const props = defineProps(['student'])
</script>

<template>
    <main class="student-info">
        <div v-if="props.student">
            <RouterLink
                class="student-info__play"
                :to="{ path: '/chat', query: { id: props.student.Id } }"
            >
                <PlayIcon class="icon play" />
            </RouterLink>
            <div class="student-info__avatar">
                <img :src="props.student.Avatar[props.student.cnt]" />
            </div>
            <div class="student-info__name">{{ props.student.Name }}</div>
            <div class="student-info__bio">{{ props.student.Bio }}</div>
            <div class="student-info__birthday">
                <BirhdayIcon style="margin-left: 10px" />
                <p style="margin-right: 10px">{{ props.student.Birthday }}</p>
            </div>
        </div>
        <div v-else style="display: flex; align-items: center; justify-content: center">
            {{ $t('selectInfo') }}
        </div>
    </main>
</template>

<style scoped lang="scss">
@import '@/assets/css/icons.scss';
@import './info-view.scss';
</style>
