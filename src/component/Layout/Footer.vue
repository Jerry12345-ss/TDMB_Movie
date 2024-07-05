<template>
    <footer>
        <div class="footer-container container">
            <div class="d-flex flex-wrap justify-content-center align-items-center">
                <div class="footer-logo col-12 col-lg-6 col-xl-4 p-2">
                    <h1>MOVIEWEB</h1>
                </div>
                <div class="tdmb col-12 col-lg-6 col-xl-4 p-3 d-flex flex-column align-items-center">
                    <img src="../../assets/img/tmdb.svg" alt="TMDB-LOGO" class="big-logo">
                    <img src="../../assets/img/small_tmdb.svg" alt="TMDB-LOGO" class="small-logo">
                    <p class="mb-0 text-center" style="color: gray; margin-top: 0.7rem; font-size: 13px;">Copyright © 2024 Jerry. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { watch } from 'vue';
</script>

<style scoped lang="scss">
footer{
    margin: 3.8rem 0;
    width: 100%;

    .footer-container{
        .footer-logo{
            font : {
                family : 'Roboto';
                weight : bold;
            }
            color: rgb(229,9,20); 
            margin-bottom: 0;
            text-align: center;
            letter-spacing: 2px;

            h1{
                font-size: 2.4rem;
                margin-bottom: 0;
            }
        }
        
        .tdmb{
            .small-logo{
                width: 150px;
                display: block;
            }

            .big-logo{
                display: none;
            }
        }
    } 
}

@media screen and (min-width : 992px){
    footer{
        .footer-container{
            .tdmb{
                .small-logo{
                    display: none;
                }

                .big-logo{
                    width: 60px;
                    display: block;
                }
            }
        }
    }
}
</style>