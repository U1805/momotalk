<template>
    <main>
        <v-md-preview :text="$t('help')"></v-md-preview>
    </main>
</template>

<style lang="scss" scoped>
main {
    @include hide-scrollbar;
    overflow-x: hidden;
}
</style>
