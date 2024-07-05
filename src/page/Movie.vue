<template>
    <div v-if="movieStatus.loading">
        <Loader/>
    </div>
    <div v-else>
        <template v-if="!movieStatus.data.detail && !movieStatus.data.recommend">
            <Loader/>
        </template>
        <template v-else>
            <MovieDetail :detail="movieStatus.data.detail" :recommend="movieStatus.data.recommend"/>
        </template>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { alertError } from '@/helper/alert_helper';
import Loader from '@/component/Loader.vue';
// import { useAxios } from '@/composition/useAxios';
import MovieDetail from '../component/MovieDetail.vue';
import { useRoute } from 'vue-router';

// const { data, loading, fetchData } = useAxios();
const route = useRoute();

const movieStatus = reactive({
    data : {
        detail : null,
        recommend : null
    },
    loading : false,
    error : null
});

onMounted(()=>{
    // fetchData({
    //     method : 'GET',
    //     url : `/movie/${movieID}`,
    //     params : {
    //         append_to_response : 'videos,casts'
    //     }
    // });
    // console.log(data);

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

// 詳細頁面無法跳轉問題解法也可以用這個 => 可參考 Vue-router Data-Fetching
// watch(()=>route.params.id, (id)=>{
//     const fetchDetail = axios.get(`/movie/${id}?append_to_response=videos,casts`);
//     const fetchRecommend = axios.get(`/movie/${id}/recommendations`);

//     movieStatus.loading = true;

//     axios.all([fetchDetail, fetchRecommend])
//     .then(result =>{
//         movieStatus.data.detail = result[0].data;
//         movieStatus.data.recommend = result[1].data;
//     }).catch(error =>{
//         movieStatus.error = error.response.data?.message;
//         alertError({}, error);
//     }).finally(()=>{
//         movieStatus.loading = false;
//     });
// });
</script>

<style scoped lang="scss"></style>