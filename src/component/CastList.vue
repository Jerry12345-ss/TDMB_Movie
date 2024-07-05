<template>
    <section class="movie-list-container">
        <div class="movie-list-title">
            <Title :title="'Cast List'" size="26"></Title>
        </div>
        <template v-if="castlist?.length === 0">
            <h3 style="color: rgb(163, 6, 14);" class="mt-5 mb-0 text-center">目前無任何卡司！！！</h3>
        </template>
        <template v-else>
            <div class="movie-list">
                <CastItem v-for="cast in newCaseList" :key="cast.id" :cast="cast"/>
                <template v-if="castlist?.length > 20">
                  <template v-if="more">
                    <CastItem v-for="cast in lastCaseList" :key="cast.id" :cast="cast"/>
                  </template>
                  <template v-else>
                    <button class="view-more-btn" @click="showMore">
                      <span class="me-1">VIEW MORE</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" style="fill: #ffffff;transform: ;msFilter:;"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
                    </button>
                  </template>
                </template>
            </div>
        </template>
    </section>
</template>

<script setup>
import Title from './Custom/Title.vue';
import CastItem from '../component/CaseItem.vue';
import { computed, ref } from 'vue';

const { castlist } = defineProps(['castlist']);
const more = ref(false);

const newCaseList = computed(()=>{
  return castlist.slice(0, 20);
});

const lastCaseList = computed(()=>{
  return castlist.slice(20);
});

const showMore = () =>{
  more.value = true; 
}
</script>

<style scoped lang="scss">
@import '../style/color.scss';
@import '../style/scroll.scss';

.movie-list-container{
    width: 100%;
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

      .view-more-btn{
        color: $text-color;
        display: flex;
        height: 150px;
        min-width: 150px;
        padding: 15px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        margin: auto 2rem;
        background-color: rgb(49, 49, 49);
        transition: all .2s ease-out;

        svg{
          transition: all .3s ease-out;
        }

        &:hover{
          background-color: rgb(65, 64, 64);

          svg{
            transform: translateX(5px);
          }
        }
      }
    }
  }
</style>