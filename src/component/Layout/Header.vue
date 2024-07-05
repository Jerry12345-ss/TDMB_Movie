<template>
    <header>
        <nav class="d-flex align-items-center">
            <button @click="showSidebar" class="nav-hamburger ms-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" style="fill: #ffffff;transform: ;msFilter:;"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
            </button>
            <div class="d-flex align-items-center personal me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: #ffffff;transform: ;msFilter:;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                <span class="personal-name">{{ state.user }}</span>

                <div class="functionality-list">
                    <ul>
                        <li @click="hadnleLogout">登出</li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { useLoginStore } from '../../stores/login';
import { alertQuestion } from '@/helper/alert_helper';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';


const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const logoutStore = useLoginStore();
const { state } = storeToRefs(logoutStore);
const router = useRouter();

const showSidebar = () =>{
    emit('update:modelValue', !props.modelValue); 
}

const hadnleLogout = () =>{
    alertQuestion({
        title : '確定要登出嗎？',
        text : '因為某些因素, 因此登出後"我的最愛"裡的資料將會清空！'
    }).then(result =>{
        if(result.isConfirmed){
            logoutStore.logout();
            router.push('/login'); 
        }
    }) 
}
</script>

<style scoped lang="scss">
@import '../../style/color.scss';

header{
    color : $text-color;
    background-color: rgb(38, 38, 38);
    padding: 20px 25px;

    nav{
        justify-content: space-between;

        .nav-hamburger{
            display: block;
        }

        .personal{
            // flex-grow: 1;
            position: relative;

            &:hover{
                .functionality-list{
                    display: block; 
                }
            }

            .personal-name{
                margin-left: .5rem;
                font-size: 18px;
            }

            .functionality-list{
                position: absolute;
                border-radius: 6px;
                right: 0;
                top: 100%; // 參考 Udmey => 100% 會在邊框的下緣, 可以設成 100 % 試試
                display: none;
                z-index: 1000;
                background-color: #686868;
                color: $text-color;
                animation: propper-module 100ms linear;

                ul{
                    li{
                        padding: 1rem;
                        cursor: pointer;

                        &:hover{
                            background-color: #8e8e8e;
                            
                            &:first-child{
                                border-top-left-radius: 6px;
                                border-top-right-radius: 6px;
                            }

                            &:last-child{
                                border-bottom-left-radius: 6px;
                                border-bottom-right-radius: 6px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@keyframes propper-module {
    // 參考 Udmey
    0%{
        opacity: 0;
        transform: scale(.9);
    }
    100%{
        opacity: 1;
        transform: scale(1);
    }
}

@media screen and (min-width: 1050px){
    header{
        nav{
            justify-content: flex-end;
            
            .nav-hamburger{
                display: none
            }
        }
    }
}
</style>