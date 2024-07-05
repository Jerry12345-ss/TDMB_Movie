<template>
    <Swiper
        :autoplay="{
            delay : 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }"
        :effect="'fade'"
        :spaceBetween="30"
        :centeredSlides="true"
        :modules="[ Autoplay, EffectFade ]"
        class="mySwiper"
    >
        <template v-if="!isMobile">
            <SwiperSlide v-for="item in data" :key="item.id">
                <img :src="`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`" :alt="item.original_title">

                <div class="backdrop">
                    <div class="d-flex align-items-center item-container">
                        <div class="col-6 d-flex justify-content-center image-container">
                            <img :src="`https://image.tmdb.org/t/p/w1280${item.poster_path}`" :alt="item.original_title">
                        </div>
                        <div class="col-6 content-container">
                            <div class="movie-title">
                                <h3>{{ item.title }}</h3>
                            </div>
                            <div class="movie-information d-flex align-items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(250, 175, 0);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                                <span class="ms-2" style="font-size: 20px;">{{ formatFloat(item.vote_average) }}</span>

                                <RouterLink :to="`/movies/${item.id}`">
                                    VIEW MORE
                                </RouterLink>
                            </div>
                            <div class="movie-overview">
                                <p>{{ item.overview }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </template>
        <template v-else>
            <SwiperSlide v-for="item in data" :key="item.id">
                <img :src="`https://image.tmdb.org/t/p/w1280${item.poster_path}`" :alt="item.original_title">

                <div class="backdrop">
                    <div class="d-flex align-items-center item-container">
                        <div class="col-12 content-container">
                            <div class="movie-title">
                                <h3>{{ item.title }}</h3>
                            </div>
                            <div class="movie-information d-flex align-items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(250, 175, 0);transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                                <span class="ms-2" style="font-size: 19px;">{{ formatFloat(item.vote_average) }}</span>

                                <RouterLink :to="`/movies/${item.id}`">
                                    VIEW MORE
                                </RouterLink>
                            </div>
                            <div class="movie-overview">
                                <p>{{ item.overview }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </template>
    </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules';
import { onMounted, onUnmounted, ref } from 'vue';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const { data } = defineProps(['data']);

const isMobile = ref(false);

onMounted(()=>{
    checkInnerWidth();

    window.addEventListener('resize', checkInnerWidth);
});

onUnmounted(()=>{
    window.removeEventListener('resize', checkInnerWidth);
})

const checkInnerWidth = () =>{
    if(window.innerWidth < 700){
        isMobile.value = true;
    }else{
        isMobile.value = false;
    } 
}

const formatFloat = (value) =>{
    return value.toFixed(1);
}
</script>

<style scoped lang="scss">
@import '../../style/color.scss';

.swiper {
  width: 100%;

  .swiper-wrapper{
    .swiper-slide{
        position: relative;

        img{
            width: 100%;
            height: 100%;
        }

        .backdrop{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            flex-direction: row;
            background: {
                color : rgba(0, 0, 0, .2);
                image : linear-gradient(to bottom, transparent, rgb(15, 15, 15));
            };
            padding: 0 1.5rem;

            .item-container{
                color : $text-color;
                margin-bottom: 5rem;

                .image-container{
                    padding: 0 2rem;
                        
                    img{
                        width: 13rem;
                        box-shadow: 0px 5px 20px #474747;
                        transition: all .6s ease-in-out;
                    }
                }

                .content-container{
                    h3{
                        font-weight: bold;
                        text-align: center;
                        font-size: 7vw;
                        margin-bottom: 0.8rem;
                    }

                    .movie-information{
                        justify-content: center;

                        a{
                            border: 1px solid $text-color;
                            padding: 8px 20px;
                            border-radius: 4px;
                            font-family: Roboto, Helvetica, Arial, sans-serif;
                            color: $text-color;
                            margin-left: 1.2rem;
                            transition: all .3s ease-out;
                            font-size: 3.5vw;

                            &:hover{
                                background-color: rgb(125, 185, 222, .5);
                            }
                        }
                    }

                    .movie-overview{
                        font-size: 4vw;
                        text-align: center;
                        
                        p{
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp : 5;
                            -webkit-box-orient: vertical;
                            line-height: 2rem;
                        }
                    }
                }
            }
        }
    }
  }
}

@mixin styleBanner ($imgWidth, $padding, $justify: 'flex-start', $linkFontSize, $overviewFontSize){
    .swiper{
        .backdrop{
            .d-flex{
                .image-container{
                    img{
                        width: $imgWidth !important;
                    }
                }

                .content-container{
                    padding-right: $padding !important;

                    .movie-information{
                        justify-content: $justify !important;
                        
                        a{
                            font-size: $linkFontSize !important;
                        }
                    }

                    .movie-overview{
                        font-size: $overviewFontSize !important;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 480px){
    @include styleBanner('', '', 'center', 1rem, 1.2rem)
}

@media screen and (min-width: 700px){
    .swiper{
        .swiper-wrapper{
            .backdrop{
                align-items: center !important;
                background: {
                    color: rgba(0, 0, 0, .3) !important;
                };

                .item-container{
                    margin-bottom: 0 !important;
                }

                .content-container{
                    padding-right: 2rem !important;

                    h3{
                        text-align: left !important;
                        font-size: 3.5vw !important;
                    }

                    .movie-information{
                        a{
                            font-size: 1.8vw !important;
                        }
                    }

                    .movie-overview{
                        text-align: left !important;
                        font-size: 1.8vw !important;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 820px){
    @include styleBanner(16rem, 2.8rem, '', 1rem, 1rem);
}

@media screen and (min-width: 992px){
    @include styleBanner(19rem, 2.8rem, '', 1.1rem, 1.1rem);
}

@media screen and (min-width: 1050px){
    @include styleBanner(15rem, 2rem, '', 1rem, 1rem);
}

@media screen and (min-width: 1300px){
    @include styleBanner(19rem, 3.5rem, '', 1rem, 1.15rem);
}

@media screen and (min-width: 1500px){
    @include styleBanner(21rem, 5rem, '', 1rem, 1.275rem);
}
</style>