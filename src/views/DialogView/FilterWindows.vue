<template>
    <div class="popper-content">
        <div class="popper-content__title">
            <header><span>{{ $t('sort') }}</span></header>
            <button>
                <CloseIcon class="icon close" @click="popperTrigger" />
            </button>
        </div>
        <div class="popper-content__button-group">
            <div>
                <button
                    @click="props.filter_condition_copy.sort_type = props.filter_condition_copy.sort_type === 'Name' ? '' : 'Name'"
                    :class="props.filter_condition_copy.sort_type === 'Name' ? 'active' : ''"><span>{{ $t('name') }}</span></button>
                <button
                    @click="props.filter_condition_copy.sort_type = props.filter_condition_copy.sort_type === 'Birthday' ? '' : 'Birthday'"
                    :class="props.filter_condition_copy.sort_type === 'Birthday' ? 'active' : ''"><span>{{ $t('birthday') }}</span></button>
            </div>
            <div>
                <button
                    @click="props.filter_condition_copy.sort_type = props.filter_condition_copy.sort_type === 'School' ? '' : 'School'"
                    :class="props.filter_condition_copy.sort_type === 'School' ? 'active' : ''"><span>{{ $t('school') }}</span></button>
                <button
                    @click="props.filter_condition_copy.sort_type = props.filter_condition_copy.sort_type === 'Club' ? '' : 'Club'"
                    :class="props.filter_condition_copy.sort_type === 'Club' ? 'active' : ''"><span>{{ $t('club') }}</span></button>
            </div>
        </div>
        <div class="popper-content__line"><span>{{ $t('filter') }}</span></div>
        <div class="popper-content__button-group">
            <div>
                <button
                    @click="props.filter_condition_copy.filter_star = (props.filter_condition_copy.filter_star + 1) % 4"
                    :class="props.filter_condition_copy.filter_star > 0 ? 'active' : ''">
                    <span>{{ $t('rare') }}
                        {{ props.filter_condition_copy.filter_star ? '⭐'.repeat(props.filter_condition_copy.filter_star)
                        : ''}}</span>
                </button>
                <button
                    @click="props.filter_condition_copy.filter_released = !props.filter_condition_copy.filter_released"
                    :class="props.filter_condition_copy.filter_released ? 'active' : ''"><span>{{ 
                    props.filter_condition_copy.filter_released ? $t('released') : $t('unreleased')
                    }}</span></button>
            </div>
        </div>
        <footer class="popper-content__footer">
            <button @click="popperConfirm"><span>OK</span></button>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CloseIcon from '@/components/icons/IconClose.vue'

const props = defineProps({
    filter_condition: {
        type: Object,
        required: true
    },
    filter_condition_copy: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['popperConfirm', 'popperTrigger'])

const popperConfirm = () => {
    emit('popperConfirm')
}

const popperTrigger = () => {
    emit('popperTrigger')
}
</script>

<style scoped lang="scss">
@import '@/assets/css/icons.scss';

.popper-content {
    @include font-regular(22px);
    width: calc((var(--view-width) - $sider-width) / 2 - 20px);
    margin: 0 10px;
    background-color: #fff;
    border-radius: 11px;
    box-shadow: rgb(45 35 66 / 15%) 0 0 4px 2px;

    button {
        @include font-regular(20px);
        width: auto;
        height: 50px;
        margin: 5px 5px;
        color: $font-grey;
        background-color: #fff;
        border: 1px solid $chatborder-color;
        border-radius: 5px;

        &:active {
            transform: scale(0.95);
            transition: 0.08s;
        }

        &.active {
            background-color: $pink;
            color: #fff;
            box-shadow: $chatborder-color 0 2px 3px;
        }
    }

    &__button-group {
        display: flex;
        flex-direction: column;
        padding: 10px 10px;
        border-bottom: 1px solid rgb(231, 235, 236);

        div {
            width: 100%;

            button {
                width: calc(50% - 10px);
            }
        }
    }

    &__footer {
        @include center;
        padding: 10px 10px;

        button {
            width: 100%;
            color: $grey;
            box-shadow: $chatborder-color 0 2px 3px;
        }
    }

    &__title {
        @include font-regular(22px);
        display: grid;
        grid-template: 'left center right close' 1fr / 1fr auto 1fr auto;
        align-items: center;
        padding: 2px 20px;
        border-bottom: 1px solid rgb(231, 235, 236);

        header {
            grid-area: left;
            padding: 5px 0px;
        }

        button {
            @include center;
            grid-area: close;
            padding: 4px;
            background-color: transparent;
            border: 2px solid transparent;
            transition: transform 50ms;
        }
    }

    &__line {
        @include font-regular(22px);
        align-items: center;
        padding: 2px 20px;
        border-bottom: 1px solid rgb(231, 235, 236);
    }
}

@import '@/assets/css/mobile.scss';
</style>
