<template>
    <div class="grids">
        <article :style="{ paddingLeft : first && '0', animationDuration : (index * 50)+'ms' }">
            <div class="link-container" @mouseover="showFavorite" @mouseout="hiddenFavorite">
                <template v-if="deletes">
                    <div class="remove-favorite">
                        <button @click="removeFavorite(data)" :class="{ show : hover }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" style="fill: #5d88a3" class="bi bi-trash-fill">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                            </svg>
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="add-favorite">
                        <button @click="addFavorite(data)" :class="{ show : hover }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(193, 7, 17);transform: ;msFilter:;"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
                        </button>
                    </div>
                </template>
                
                <RouterLink :to="`/movies/${data.id}`" class="text-center">
                    <div class="card-content d-flex flex-column">
                        <template v-if="data.poster_path !== null">
                            <img :src="`https://image.tmdb.org/t/p/w500${data.poster_path}`" :alt="data.original_title">
                        </template>
                        <template v-else>
                            <img src="../assets/img/noImage.png" :alt="data.original_title">
                        </template>

                        <div class="movie-text">
                            <div class="movie-title">
                                <h5 class="mb-2" style="text-align: left;">{{ data.title }}</h5>
                            </div>
                            <div class="movie-information d-flex align-items-center justify-content-between">
                                <div class="movie-stars d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(250, 175, 0);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                                    <span>{{ formatFloat(data.vote_average) }}</span>
                                </div>
                                <div class="movie-date">
                                    <span>{{ getYear(data.release_date) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </article>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getYear } from '../composition/formatDate';
import { alertSuccess, alertWarning } from '@/helper/alert_helper';
import { useFavoriteMovieStore } from '@/stores/favorite';

const hover = ref(false);
const { data, first, deletes, index } = defineProps(['data', 'first', 'deletes', 'index']);

const { addMovie, removeMovie } = useFavoriteMovieStore();


const formatFloat = (value) =>{
    return value.toFixed(1);
}

const showFavorite = () =>{
    hover.value = true;
}

const hiddenFavorite = () =>{
    hover.value = false;
}

const addFavorite = (data) =>{
    const result = addMovie(data);
    
    if(result){
        alertWarning({ title : '此電影已存在於我的最愛囉 !', showCancelButton : false });
    }else{
        alertSuccess({ title : '加入我的最愛成功 !' });
    }
}

const removeFavorite = (data) =>{
    alertWarning({ title : '確定移除嗎？' })
    .then(result => {
        if(result.isConfirmed){
            removeMovie(data);
        }
    });
}
</script>

<style scoped lang="scss">
@import '../style/color.scss';

@mixin gridSystem($flex, $grow, $width){
    flex: $flex;
    flex-grow: $grow;
    width: $width;
}

@keyframes itemScale {
    0%{
        transform: scale(0.8);
    }

    100%{
        transform: scale(1);
    }
}

article{
    margin-bottom: 1rem;
    padding: 15px 20px;
    animation: itemScale linear normal;

    .link-container{
        width: 220px;
        display: block;
        margin: auto;
        position: relative;
        transition: all .3s ease-in-out;

        &:hover{
            transform: scale(1.05);
        }

        %favorite{
            z-index: 100;
            position: absolute;
            right: 15px;

            button{
                background-color: #fcfafa;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                box-shadow: 0 2px 5px rgba(35, 35, 35, 0.8);
                transition: all .4s ease-out;
                opacity: 0;
                cursor: pointer;

                &:hover{
                    background-color: #ede1e1;
                }
            }

            button.show{
                transform: translateY(15px);
                opacity: 1;
            }
        }
        
        .add-favorite{
            @extend %favorite;
        }

        .remove-favorite{
            @extend %favorite;

            button{
                background-color: #e0f0fa;
                
                &:hover{
                    background-color: #bde0f5;
                }
            }
        }

        a{
            .card-content{
                img{
                    width: 100% !important;
                    height: 300px !important;
                    object-fit: cover !important;
                }

                .movie-text{
                    background-color: rgb(39, 39, 39);
                    padding: 15px;

                    .movie-title{
                        h5{
                            color: $text-color;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }

                    .movie-information{
                        .movie-stars{
                            span{
                                color: $text-color;
                                margin-left: 5px;
                            }
                        }

                        .movie-date{
                            padding: 4px 8px;
                            background-color: rgba(76, 76, 76, 0.8);
                            border-radius: 6px;

                            span{
                                font-size: 14px;
                                color: $text-color;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (min-width : 1050px){
    .grids{
        @include gridSystem(33.3333%, 0, 33.33333%);
    }
}

@media screen and (min-width : 1350px){
    .grids{
        @include gridSystem(25%, 0, 25%);
    }
}

@media screen and (min-width : 1600px){
    .grids{
        @include gridSystem(20%, 0, 20%);
    }
}
</style>