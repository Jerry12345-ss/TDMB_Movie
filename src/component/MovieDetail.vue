<template> 
    <div class="backdrop">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-5 col-xxl-4">
                    <div class="image-container">
                        <template v-if="detail.poster_path !== null">
                            <img :src="`https://image.tmdb.org/t/p/w500${detail.poster_path}`" :alt="detail.original_title">
                        </template>
                        <template v-else>
                            <img src="../assets/img/noImage.png" :alt="detail.original_title">
                        </template>
                    </div>
                </div>
                <div class="col-md-6 col-lg-7 col-xxl-8">
                    <div class="movie-title">
                        <h2>{{ detail.title }} ( {{ getYear(detail.release_date) }} )</h2>
                    </div>
                    <div class="movie-tagline movie-area">
                        <h4 style="color: rgb(171, 169, 169); font-weight: 300;">{{ detail?.tagline }}</h4>
                    </div>
                    <div class="d-flex align-items-center movie-area" style="font-size: 22px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: rgb(250, 175, 0);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                        <span class="px-2">{{ getRate }}</span>
                        <span class="px-2">{{ detail.runtime }} min</span>
                        <span class="ms-4" style="padding: 5px 15px; border-radius: 6px; font-size: 18px;" :style="{ background : detail.status === 'Released' ? '#FFB11B' : '#2E5C6E'}">{{ detail.status }}</span>
                    </div>
                    <div class="movie-genres movie-area">
                        <span v-for="(item, index) in getGenres" :key="item.id">
                            <template v-if="index === (getGenres.length - 1)">
                                {{ item }}
                            </template>
                            <template v-else>
                                {{ item }},
                            </template>
                        </span>
                    </div>
                    <div class="movie-overview movie-area">
                        <h3>Overview</h3>
                        <template v-if="detail?.overview && detail?.overview !== ''">
                            <p>{{ detail.overview }}</p>
                        </template>
                        <template v-else>
                            <p>no overview content in here !</p>
                        </template>
                    </div>
                    <div class="movie-area">
                        <template v-if="getDirector !== ''">
                            <h5 style="font-weight: 300; color: rgb(192, 192, 192); font-size: 20px;">Director by <span style="color: #ffffff;" class="ms-3">{{ getDirector }}</span></h5>
                        </template>
                        <template v-else>
                            <h5 style="font-weight: 300; color: rgb(192, 192, 192); font-size: 20px;">No Director</h5>
                        </template>
                    </div>
                    <div class="movie-functionality d-flex flex-wrap" style="margin-bottom: 2rem;">
                        <button id="website">
                            <template v-if="detail?.homepage">
                                <a :href="detail.homepage" target="_blank" class="d-flex align-items-center">
                                    <span>WEBSITE</span>
                                    <svg class="ms-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: #7DB9DE;transform: ;msFilter:;"><path d="M2.76 20.2a2.73 2.73 0 0 0 2.15.85 8.86 8.86 0 0 0 3.37-.86 9 9 0 0 0 12.27-10.9c1.31-2.23 1.75-4.26.67-5.48a2.94 2.94 0 0 0-2.57-1A5 5 0 0 0 16.1 4 9 9 0 0 0 3.58 15.14c-1.06 1.21-2.05 3.68-.82 5.06zm1.5-1.32c-.22-.25 0-1.07.37-1.76a9.26 9.26 0 0 0 1.57 1.74c-1.03.3-1.71.28-1.94.02zm14.51-5.17A7 7 0 0 1 15.58 18 7.12 7.12 0 0 1 12 19a6.44 6.44 0 0 1-1.24-.13 30.73 30.73 0 0 0 4.42-3.29 31.5 31.5 0 0 0 3.8-4 6.88 6.88 0 0 1-.21 2.13zm.09-8.89a.94.94 0 0 1 .87.32c.23.26.16.94-.26 1.93a9.2 9.2 0 0 0-1.61-1.86 2.48 2.48 0 0 1 1-.39zM5.22 10.31A6.94 6.94 0 0 1 8.41 6 7 7 0 0 1 12 5a6.9 6.9 0 0 1 6 3.41 5.19 5.19 0 0 1 .35.66 27.43 27.43 0 0 1-4.49 5A27.35 27.35 0 0 1 8.35 18a7 7 0 0 1-3.13-7.65z"></path></svg>
                                </a>
                            </template>
                            <template v-else>
                                <a target="_blank" class="d-flex align-items-center" @click="alertError({ title : 'Sorry, there is no website link!' })">
                                    <span>WEBSITE</span>
                                    <svg class="ms-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: #7DB9DE;transform: ;msFilter:;"><path d="M2.76 20.2a2.73 2.73 0 0 0 2.15.85 8.86 8.86 0 0 0 3.37-.86 9 9 0 0 0 12.27-10.9c1.31-2.23 1.75-4.26.67-5.48a2.94 2.94 0 0 0-2.57-1A5 5 0 0 0 16.1 4 9 9 0 0 0 3.58 15.14c-1.06 1.21-2.05 3.68-.82 5.06zm1.5-1.32c-.22-.25 0-1.07.37-1.76a9.26 9.26 0 0 0 1.57 1.74c-1.03.3-1.71.28-1.94.02zm14.51-5.17A7 7 0 0 1 15.58 18 7.12 7.12 0 0 1 12 19a6.44 6.44 0 0 1-1.24-.13 30.73 30.73 0 0 0 4.42-3.29 31.5 31.5 0 0 0 3.8-4 6.88 6.88 0 0 1-.21 2.13zm.09-8.89a.94.94 0 0 1 .87.32c.23.26.16.94-.26 1.93a9.2 9.2 0 0 0-1.61-1.86 2.48 2.48 0 0 1 1-.39zM5.22 10.31A6.94 6.94 0 0 1 8.41 6 7 7 0 0 1 12 5a6.9 6.9 0 0 1 6 3.41 5.19 5.19 0 0 1 .35.66 27.43 27.43 0 0 1-4.49 5A27.35 27.35 0 0 1 8.35 18a7 7 0 0 1-3.13-7.65z"></path></svg>
                                </a>
                            </template>
                        </button>
                        <button id="addFavorite" class="d-flex align-items-center" @click="addFavorite(detail)">
                            <span>FAVORITE</span>
                            <svg class="ms-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: #7DB9DE;transform: ;msFilter:;"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
                        </button>
                        <button id="goBack" class="d-flex align-items-center" @click="handleGoBack">
                            <span>BACK</span>
                            <svg class="ms-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: #7DB9DE;transform: ;msFilter:;"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                        </button>
                    </div>
                    <div class="movie-videos movie-area">
                        <Video v-for="video in getVideo" :key="video.id" :title="detail.original_title" :link="video.key"></Video>
                    </div>
                </div>
            </div>
            <div class="cast-list">
                <CastList :castlist="detail?.casts?.cast"/>
            </div>
            <div class="recommend-list mb-4">
                <ScrollList title="You may also like" :data="recommend?.results"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import CastList from './CastList.vue';
import { getYear } from '@/composition/formatDate';
import { useRouter } from 'vue-router';
import { alertError, alertSuccess, alertWarning } from '@/helper/alert_helper';
import Video from '../component/Custom/Video.vue';
import ScrollList from './ScrollList.vue';
import { useFavoriteMovieStore } from '@/stores/favorite';

const { detail, recommend } = defineProps(['detail', 'recommend']);
const router = useRouter();
const { addMovie } = useFavoriteMovieStore();

onMounted(()=>{
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${detail.backdrop_path}')`;
});

const getRate = computed(()=>{
    return (detail.vote_average).toFixed(1);
});

const getGenres = computed(()=>{
    return detail.genres.map(item => item.name);
});

const getDirector = computed(()=>{
    const result = detail.casts.crew.find(person => person.known_for_department);

    if(result){
        return result.name;
    }else{
        return '';
    }
});

const getVideo = computed(()=>{
    return detail?.videos.results.slice(0, 3);
})

const handleGoBack = () =>{
    router.go(-1); 
}

const addFavorite = (data) =>{
    const result = addMovie(data);
    
    if(result){
        alertWarning({ title : '此電影已存在於我的最愛囉 !', showCancelButton : false });
    }else{
        alertSuccess({ title : '加入我的最愛成功 !' });
    }
}
</script>

<style scoped lang="scss">
@import '../style/color.scss';
@import '../style/scroll.scss';

.backdrop{
    background : {
        position : center;
        repeat : no-repeat;
        attachment : fixed;
        size : cover;
    }
    width: 100%;
    height: 100%;
    position: relative;

    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1;
    }

    .container{
        color: $text-color;
        z-index: 800;
        position: relative;

        .row{
            padding: 25px 0;
            padding-top: 4rem;

            .image-container{
                img{
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    border-radius: 12px;
                    box-shadow: 0 5px 10px 8px #474747;
                }
            }

            .movie-area{
                margin-bottom: 1.3rem;
            }

            .movie-title{
                margin-top: 2rem;

                h2{
                    font-size: 2.2rem;
                }
            }

            .movie-genres{
                span{
                    color: rgb(171, 169, 169);
                    margin: 0 .2rem;

                    &:first-child{
                        margin-left: 0;
                    }
                }
            }

            .movie-overview{
                p{
                    font-size: 18px;
                    line-height: 2rem;
                    max-width: 800px;
                }
            }

            .movie-functionality{
                button{
                    padding: 8px 20px;
                    border: 1px solid #5d88a3;
                    border-right-width: 1px;
                    color: #7DB9DE;
                    font-family: Roboto, Helvetica, Arial, sans-serif;
                    transition: all .2s ease-out;

                    &:hover{
                       border-color: #9ccdec;
                       background-color: rgb(50, 49, 49)
                    }

                    a{
                        color: #7DB9DE;
                    }
                }
            }

            .movie-videos{
                display: flex;
                overflow: auto;
            }
        }
    }
}

@media screen and (min-width : 380px){
    .backdrop{
        .container{
            .row{
                .image-container{
                    // height: 450px;
                    width: 300px;
                    margin: auto;
                    transition: all 0.6s ease-in-out;
                }
            }
        }
    }
}

@media screen and (min-width : 768px){
    .backdrop{
        .container{
            .row{
                .movie-title{
                    margin-top: 0rem;
                }
            }
        }
    }
}

@media screen and (min-width : 1350px){
    .backdrop{
        .container{
            .row{
                .image-container{
                    // height: 500px;
                    width: 350px;
                }
            }
        }
    }
}
</style>