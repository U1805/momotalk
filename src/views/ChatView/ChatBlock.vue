<template>
    <span
        v-if="mdUtils.checkFlag"
        v-html="props.element.content"
        :data-flag="true"
        contenteditable
        @focus="mdUtils.clicked($event, props.element.Id)"
        @blur="blur_($event)"
    ></span>
    <span
        v-else
        v-text="props.element.content"
        :data-flag="true"
        contenteditable
        @focus="mdUtils.clicked($event, props.element.Id)"
        @blur="blur_($event)"
    ></span>
</template>

<script setup lang="ts">
import { saveEdit } from '@/assets/storeUtils/saveEdit'
import { mdUtils } from '@/assets/utils/markdown'
const props = defineProps(['element'])

const blur_ = (event:Event)=>{
    saveEdit(event, props.element.Id, 'content');
    mdUtils.blured(event, props.element.Id)
}
</script>
