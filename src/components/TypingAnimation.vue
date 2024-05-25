<template>
    <div class="loading">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss">
@function zoom($value) {
    @return calc(var(--zoom) * $value);
}

.loading {
    //https://juejin.cn/post/7037036742985121800
    display: flex;
    flex-direction: row;
    height: zoom(32px);
    align-items: center;
    > div {
        position: relative;
        box-sizing: border-box;
        background-color: currentColor;
        border: 0 solid currentColor;
        width: zoom(10px);
        height: zoom(10px);
        margin: zoom(4px);
        border-radius: 100%;
        animation: ball-beat 0.7s-0.15s infinite linear;

        &:nth-child(2n - 1) {
            animation-delay: -0.5s;
        }
    }

    .lo ading {
        display: block;
        font-size: 0;
        color: #000;
        width: zoom(54px);
        height: zoom(18px);
    }
}

.loading.la-dark {
    color: #333;
}

@keyframes ball-beat {
    50% {
        opacity: 0.2;
        transform: scale(0.75);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
