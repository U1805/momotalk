<script setup lang="ts">
import i18n from '@/assets/locales/i18n'
</script>

<template>
    <main>
        <v-md-preview :text="i18n.global.t('help')"></v-md-preview>
    </main>
</template>

<style lang="scss" scoped>
main {
    @include hide-scrollbar;
    overflow-x: hidden;
}
</style>
