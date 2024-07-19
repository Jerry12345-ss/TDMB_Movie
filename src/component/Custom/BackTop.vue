<template>
    <button @click="backtop" :class="{ show : show }">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" style="fill: #ffffff;transform: ;msFilter:;"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19zm9-12.243L19.092 17H4.908L12 6.757z"></path></svg>
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const show = ref(false);

const backtop = () =>{
    window.scrollTo({
        top : 0,
        behavior : 'smooth'
    });
}

onMounted(()=>{
    window.addEventListener('scroll', handleScroll)
});

onUnmounted(()=>{
    window.removeEventListener('scroll', handleScroll)
});

const handleScroll = () =>{
    if(window.scrollY > 300){
        show.value = true;
    }else{
        show.value = false;
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/color.scss';

button{
    position: fixed;
    z-index: 1000;
    background-color: $theme-color;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    bottom: 35px;
    right: 35px;
    text-align: center;
    border: 2px solid $theme-color;
    transition: all .3s ease-out;
    display: none;

    &:hover{
        background-color: $text-color;

        svg{
            fill: $theme-color !important;
        }
    }
}

button.show{
    display: block;
}
</style>