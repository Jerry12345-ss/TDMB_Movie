<template>
    <section class="movie-list-container">
        <div class="movie-list-title">
            <Title :title="title" size="26"></Title>
        </div>
        <template v-if="data?.length === 0">
            <h3 style="color: rgb(163, 6, 14);" class="mt-5 mb-5 text-center">目前無任何電影！！！</h3>
        </template>
        <template v-else>
            <div class="movie-list">
              <MovieItem v-for="(movie, index) in data" :key="movie.id" :data="movie" :first="index === 0"/>
            </div>
        </template>
    </section>
</template>

<script setup>
import Title from '../component/Custom/Title.vue';
import MovieItem from '../component/Movieitem.vue';

const { title, data } = defineProps(['title', 'data']);
</script>

<style scoped lang="scss">
@import '../style/color.scss';
@import '../style/scroll.scss';

.movie-list-container{
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;

  .movie-list-title{
    h2{
      color: $text-color;
      font-size: 28px;
      margin-bottom: 0.8rem;
    }
  }

  .movie-list{
    overflow: scroll hidden;
    display: flex;
  }
}
</style>