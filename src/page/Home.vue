<template>
  <div class="containers">
    <template v-if="movieStatus.loading">
      <Loader/>
    </template>
    <template v-else-if="!movieStatus.data.now || !movieStatus.data.popular || !movieStatus.data.top || !movieStatus.data.trend || !movieStatus.data.upcoming">
      <h2 style="color: rgb(163, 6, 14);" class="mt-5 mb-0 text-center">發生不明錯誤, &nbsp; 請稍後再試！</h2>
    </template>
    <template v-else>
      <div class="fadeIn-animation">
        <AutoSwiper :data="movieStatus?.data.now" :isMobile="isMobile"/>
      
        <div class="container">
          <ScrollList title="Weekly Trending Movies" :data="movieStatus?.data?.trend"/>
          <ScrollList title="Top Rated Movies" :data="movieStatus?.data?.top"/>
          <ScrollList title="Popular Movies" :data="movieStatus?.data?.popular"/>
          <ScrollList title="Upcoming Movies" :data="movieStatus?.data?.upcoming"/>
          <Footer></Footer>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive} from 'vue';
import Loader from '@/component/Loader.vue';
import Footer from '@/component/Layout/Footer.vue';
import { alertError } from '@/helper/alert_helper';
import ScrollList from '../component/ScrollList.vue';
import AutoSwiper from '../component/Custom/AutoSwiper.vue';

const movieStatus = reactive({
  data : {
    now : null,
    trend : null,
    top : null,
    popular : null,
    upcoming : null
  },
  loading : false,
  error : null
});

onMounted(()=>{
  const fetchNowPlaying = axios.get('/movie/now_playing?page=1'); 
  const fetchTrending = axios.get('/trending/movie/week?page=1'); 
  const fetchTopRated = axios.get('/movie/top_rated?page=1');
  const fetchPopular = axios.get('/movie/popular?page=1');
  const fetchUpcoming = axios.get('/movie/upcoming?page=1');

  movieStatus.loading = true;

  axios.all([fetchNowPlaying, fetchTrending, fetchTopRated, fetchPopular, fetchUpcoming])
  .then(result =>{
    movieStatus.data.now = result[0].data.results.slice(0, 10);
    movieStatus.data.trend = result[1].data.results;
    movieStatus.data.top = result[2].data.results;
    movieStatus.data.popular = result[3].data.results;
    movieStatus.data.upcoming = result[4].data.results;
  }).catch(error =>{
    movieStatus.error = error.response.data?.message;
    alertError({}, error);
  }).finally(()=>{
    movieStatus.loading = false;
  });
});
</script>

<style scoped lang="scss">
.containers{
  height: calc(100% - 67px);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
}
</style>