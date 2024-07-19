<template>
    <Dialog @close="hiddenDialog" :class="show ? 'show' : ''">
        <template #header>
            <h3 class="mb-0">問題公告</h3>
        </template>
        <template #default>
            <p style="padding: 1rem 0; text-align: center;">因為 TMDB API <span style="color: red;">最多僅能顯示 500 頁資料</span>, 故當超過 500 頁時系統將會自動帶為 500, 造成您的不便還請見諒！</p>
        </template>
        <template #footer></template>
    </Dialog>
    <div class="container">
        <div v-if="loading">
            <Loader/>
        </div>
        <div v-else-if="!data">
            <h2 style="color: rgb(163, 6, 14);" class="mt-5 mb-0 text-center">發生不明錯誤, &nbsp; 請稍後再試！</h2>
        </div>
        <div v-else class="fadeIn-animation">
            <Title :title="title" style="margin-left: 20px;"></Title>
            <template v-if="data?.results?.length === 0">
                <h3 style="color: rgb(163, 6, 14);" class="mt-5 mb-0 text-center">目前尚未有任何電影！！！</h3>
            </template>
            <template v-else>
                <MovieList :movies="data?.results"/>
                <Pagination @click="showDialog" :total="data?.total_pages" v-model="currentPage"/>
                <Footer></Footer>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import Loader from './Loader.vue';
import Footer from './Layout/Footer.vue';
import MovieList from './MovieList.vue';
import Title from './Custom/Title.vue';
import { useAxios } from '@/composition/useAxios';
import Dialog from './Custom/Dialog.vue';
import { useDialog } from '@/composition/useDialog';
import Pagination from './Custom/Pagination.vue';

const { url, paramsId, title } = defineProps(['url', 'paramsId', 'title']);
const { loading, data, fetchData } = useAxios();
const { show, showDialog, hiddenDialog } = useDialog();

const currentPage = ref(1);

watchEffect(()=>{
    fetchData({
        method : 'GET',
        url,
        params : {
            page : currentPage.value,
            with_genres : paramsId ?? null
        }
    });
});
</script>

<style lang="scss" scoped>
</style>