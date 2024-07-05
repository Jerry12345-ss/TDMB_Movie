<template>
    <article class="cast-container">
        <div class="p-3 d-flex flex-column">
            <div class="cast-image">
                <template v-if="cast.profile_path !== null">
                    <img :src="`https://image.tmdb.org/t/p/w500${cast.profile_path}`" :alt="cast.original_name">
                </template>
                <template v-else>
                    <img src="../assets/img/noImage.png" :alt="cast.original_title">
                </template>
            </div>
            <div class="cast-name d-flex">
                <h4>{{ cast.original_name }}</h4>
                <span>{{ cast.name }}</span>
            </div>
        </div>
    </article>
</template>

<script setup>
const { cast } = defineProps(['cast']);
</script>

<style scoped lang="scss">
article{
    margin-bottom: 1.8rem;
    border-radius: 6px;
    transition: all .2s ease-out;

    &:hover{
        background-color: rgba(60, 59, 59, .7);
    }

    .flex-column{
        .cast-image{
            height: 300px; 
            width: 200px;

            img{
                border-radius: 6px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .cast-name{
            margin-top: 1.5rem;
            flex-direction: column;

            span{
                color: rgba(255, 255, 255, 0.6);
            }
        }
    }
}
</style>

<!-- 
    1. 會給予 load-more button, 但只是透過 v-if / v-show 方式呈現
 -->