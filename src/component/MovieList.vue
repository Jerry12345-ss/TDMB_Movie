<template>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
        <Movieitem v-for="(movie, index) in movies" :key="movie.id" :data="movie" :deletes="deletes" :index="index"/>
    </div>
</template>

<script setup>
import Movieitem from './Movieitem.vue';

const { movies, deletes } = defineProps(['movies', 'deletes']);
</script>

<style scoped lang="scss">
</style>