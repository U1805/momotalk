<template>
    <span
        v-if="mdUtils.checkFlag"
        v-html="props.content"
        :data-flag="true"
        contenteditable
        @focus="mdUtils.clicked($event, props.element.Id)"
        @keydown="keyHandle($event, props.element.Id, props.index);"
        @blur="blur_($event)"
    ></span>
    <span
        v-else
        v-text="props.content"
        :data-flag="true"
        contenteditable
        @focus="mdUtils.clicked($event, props.element.Id)"
        @keydown="keyHandle($event, props.element.Id, props.index);"
        @blur="blur_($event)"
    ></span>
</template>

<script setup lang="ts">
import { saveReplyEdit,keyHandle } from '@/assets/storeUtils/saveEdit'
import { mdUtils } from '@/assets/utils/markdown'
const props = defineProps(['element', 'content', 'index'])

const blur_ = (event:Event)=>{    
    saveReplyEdit(event, props.element.Id, props.index);
    mdUtils.blured(event, props.element.Id)
}
</script>
