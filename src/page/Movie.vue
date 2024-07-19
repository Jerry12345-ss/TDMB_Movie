<template>
    <div v-if="movieStatus.loading">
        <Loader/>
    </div>
    <div v-else-if="!movieStatus.data.detail || !movieStatus.data.recommend">
        <h2 style="color: rgb(163, 6, 14);" class="mt-5 mb-0 text-center">發生不明錯誤, &nbsp; 請稍後再試！</h2>
    </div>
    <div v-else>
        <MovieDetail :detail="movieStatus.data.detail" :recommend="movieStatus.data.recommend"/>
    </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';
import axios from 'axios';
import { alertError } from '@/helper/alert_helper';
import Loader from '@/component/Loader.vue';
import MovieDetail from '../component/MovieDetail.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const movieStatus = reactive({
    data : {
        detail : null,
        recommend : null
    },
    loading : false,
    error : null
});

watchEffect(()=>{
    const fetchDetail = axios.get(`/movie/${route.params.id}?append_to_response=videos,casts`);
    const fetchRecommend = axios.get(`/movie/${route.params.id}/recommendations`);

    movieStatus.loading = true;

    axios.all([fetchDetail, fetchRecommend])
    .then(result =>{
        movieStatus.data.detail = result[0].data;
        movieStatus.data.recommend = result[1].data;
    }).catch(error =>{
        movieStatus.error = error.response.data?.message;
        alertError({}, error);
    }).finally(()=>{
        movieStatus.loading = false;
    });
});
</script>

<style scoped lang="scss"></style>