<template>
    <div :class="['aside-overlay', { show : show }]"></div>
    <aside :class="{ show : show }">
        <div class="d-flex flex-column">
            <div class="sidebar-logo">
                <RouterLink to="/">
                    <h3>MOVIEWEB</h3>
                </RouterLink>
            </div>
            <hr>

            <div class="sidebar-func">
                <ul>
                    <li v-for="item in func" :key="item.name">
                        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
                    </li>
                </ul>
            </div>
            <hr>

            <div class="sidebar- categories">
                <ul>
                    <li class="sidebar-item-title">Categories</li>
                    <li v-for="item in categories" :key="item.name">
                        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
                    </li>
                </ul>
            </div>
            <hr>

            <div class="sidebar-geners">
                <ul style="padding-bottom: 0;">
                    <li class="sidebar-item-title">Genres</li>
                    <li v-for="item in geners" :key="item.name">
                        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { categories, geners, func } from '../../nav.js';

const { show } = defineProps(['show']);
const emit = defineEmits(['update:show'])

// 這邊用 onMounted 處理
onMounted(()=>{
    document.querySelectorAll('aside a').forEach(item =>{
        item.addEventListener('click', ()=>{
            emit('update:show', false);
        });
    });

    window.addEventListener('click', (event)=>{
        toggleSidebar(event);
    });
});

onUnmounted(()=>{
    window.removeEventListener('click', (event)=>{
        toggleSidebar(event);
    });
});

const toggleSidebar = (event) =>{
    const overlay = document.querySelector('.aside-overlay.show');

    if(event.target === overlay){
        emit('update:show', false);
    }
}
</script>

<style scoped lang="scss">
@import '../../style/color.scss';

aside{
    background-color: rgb(21, 20, 20);
    color: $text-color;
    width: 260px;
    position: fixed;
    // min-height: 100vh;
    height: 100%;
    z-index: 1500;
    display: block;
    transition: all .4s ease-out;
    transform: translateX(-260px);
    overflow-y: auto;

    .sidebar-logo{
        a{
            padding: 25px 15px;
            display: block;

            h3{
                font : {
                    family : 'Roboto';
                    weight : bold;
                }
                color: rgb(229,9,20); 
                margin-bottom: 0;
                text-align: center;
                letter-spacing: 2px;
            }
        }
    }

    hr{
        border-color: #939393;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }

    ul{
        padding: 20px 0;

        li{
            a{
                padding: 10px 15px;
                color: $text-color;
                display: block;
                transition: all .3s ease-in-out;

                &:hover{
                    background-color: rgba(255, 255, 255, .1);
                }
            }

            .router-link-exact-active{
                background-color: rgb(163, 5, 13)!important;
            }
        }

        .sidebar-item-title{
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            padding: 8px 15px;
        }
    }
}

.aside-overlay{
    background-color: transparent;
}

aside.show{
    transform: translate(0);
}

.aside-overlay.show{
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1200;
}

@media screen and (min-width : 1050px){
    aside{
        transform: translateX(0);
        transition: all .4s ease-out;
    }

    .aside-overlay.show{
        display : none
    }
}
</style>