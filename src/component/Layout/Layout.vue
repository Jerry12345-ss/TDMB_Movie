<template>
    <Sidebar v-model:show="isShowSidebar"></Sidebar>
    <main>
        <Header v-model="isShowSidebar"></Header>
        <!-- 詳細頁面無法跳轉問題解法 : https://stackoverflow.com/questions/69638667/vue-router-is-changing-the-url-but-not-re-rendering-the-component -->
        <RouterView :key="$route.params[$route.meta.watchParams]"/>
        <BackTop/>
        <!-- 為了讓 loader 能蓋掉 footer 所以才這樣寫, 但不知道有沒又更好的解法 -->
        <!-- <Footer></Footer> -->
    </main>
</template>

<script setup>
import Header from './Header.vue';
import Sidebar from '../Layout/Sidebar.vue';
import BackTop from '../Custom/BackTop.vue';
import { ref } from 'vue';

const isShowSidebar = ref(false);
</script>

<style scoped lang="scss">
main{
    transition: all .4s ease-out;
    width: 100%;
    overflow-y: hidden;
}

@media screen and (min-width : 1050px){
    main{
        width: calc(100% - 260px);
        margin-left: 260px;
        transition: all .4s ease-out;
    }
}
</style>