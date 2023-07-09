<template>
  <div class="loading">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss">
.loading {
  //https://juejin.cn/post/7037036742985121800
  display: flex;
  flex-direction: row;
  > div {
    position: relative;
    box-sizing: border-box;
    background-color: currentColor;
    border: 0 solid currentColor;
    width: 10px;
    height: 10px;
    margin: 4px;
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
    width: 54px;
    height: 18px;
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
