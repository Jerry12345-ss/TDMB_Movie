<template>
    <div class="loader-container">
      <span class="loader"></span>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
// 參考 loading css 
.loader-container{
  position: fixed;
  // background-color: black;
  display: flex;
  justify-content: center;
  // z-index: 5000 !important;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  .loader {
    position: relative;
    width: 4px;
    height: 13px;
    background-color: rgba(189, 7, 16, .8);
    animation: escaleY 1.7s infinite ease-in-out;
    animation-delay: 0.15s;
    opacity: 0.8;
    display: block;

    // 不太懂這2個用意
    color: rgba(189, 7, 16, .8);
    font-size: 5px;

    &::before, &::after{
      content: '';
      width: 4px;
      height: 13px;
      background-color: rgba(189, 7, 16, .8);
      position: absolute;
      top: 0;
      left: 8px;
      animation: escaleY 1.7s infinite ease-in-out;
      opacity: 0.8;
    }

    &::before{
      left: -8px;
    }

    &::after{
      animation-delay: 0.25s;
    }
  }
}

@keyframes escaleY{
  // 以下 box-shadow 也不太懂
   0%, 80%, 100%{
    box-shadow: 0 0;
    height: 10px;
    background-color: rgba(189, 7, 16, .6);
    color: rgba(189, 7, 16, .6);
    opacity: 0.6;
   }

   40%{
    box-shadow: 0 -1.5em;
    height: 15px;
    background-color: rgb(189, 7, 16);
    color: rgb(189, 7, 16);
    opacity: 0.9;
   }
}

@media screen and (min-width : 1050px){
  .loader-container{
    left: 260px;
    width: calc(100% - 260px);
  }
}
</style>