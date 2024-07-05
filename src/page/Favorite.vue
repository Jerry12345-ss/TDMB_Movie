<template>
    <div class="container">
        <div v-if="!movies">
            <Loader/>
        </div>
        <div v-else class="fadeIn-animation">
            <Title title="Favorite Movies" style="margin-left: 20px;"></Title>
            <template v-if="movies?.length === 0">
                <h3 style="color: rgb(163, 6, 14);" class="mt-5 mb-0 text-center">目前尚未有任何電影！！！</h3>
            </template>
            <template v-else>
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <h5 class="mb-3">最愛電影的總數為 :&nbsp; {{ movies.length }} </h5>
                    <button class="btn btn-primary resetBtn mb-3" @click="clearMovie">清空</button>
                </div>

                <MovieList :movies="data" :deletes="true"/>

                <div v-if="loadMore" class="text-center">
                    <button class="btn btn-primary loadmoreBtn" @click="()=>{ currentPage ++ }">LOAD MORE</button>
                </div>

                <Footer></Footer>
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Title from '@/component/Custom/Title.vue';
import MovieList from '@/component/MovieList.vue';
import Loader from '@/component/Loader.vue';
import { useFavoriteMovieStore } from '../stores/favorite';
import Footer from '@/component/Layout/Footer.vue';
import { storeToRefs } from 'pinia';
import { alertQuestion } from '@/helper/alert_helper';

const loadMore = ref(true);
const currentPage = ref(0);
const rowPerPage = ref(20);

const favoriteStore = useFavoriteMovieStore();
const { movies } = storeToRefs(favoriteStore);

const data = ref(movies.value);

const clearMovie = () =>{
    alertQuestion({ title : '是否清空我的最愛？' })
    .then(result => {
        if(result.isConfirmed){
            favoriteStore.$reset(); 
        }
    })
}

onMounted(()=>{
    handleLoadMore(movies.value);
});

const handleLoadMore = (state) =>{
    if(state.length > 20){
        loadMore.value = true; 
    }else{
        loadMore.value = false;
    }
}

watchEffect(()=>{
    data.value = movies.value.slice(currentPage, (currentPage.value * rowPerPage.value) + rowPerPage.value);

    if(data.value.length === movies.value.length){
        loadMore.value = false;
    }
});
</script>

<style scoped lang="scss">
@import '../style/color.scss';

@mixin buttonStyle($backColor, $border, $color, ) {
    background-color: $backColor !important;
    border: $border !important;
    color: $color;
    transition: all .2s ease-out;
}

.d-flex{
    margin: 0 20px;

    h5{
        color: $text-color;  
    }

    .resetBtn{
        @include buttonStyle(transparent, 2px solid rgb(86, 86, 86), rgb(203, 201, 201));

        &:hover{
            background-color: rgb(38, 38, 38) !important;
        }
    }
}

.loadmoreBtn{
    @include buttonStyle(rgba(229, 9, 20, .6), none, #ffffff);
    padding: 10px 25px;

    &:hover{
        background-color: rgba(255, 35, 46, 0.7) !important;
    }
}
</style>