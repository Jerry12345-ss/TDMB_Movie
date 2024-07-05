<template>
    <div class="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgb(141, 139, 139);transform: ;msFilter:;"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg>
        <input type="text" class="form-control" placeholder="Search" :value="props.modelValue" @focus="handleFocus" @blur="handleBlur" @keydown.enter="handleSearch($event.target.value)">
    </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const handleFocus = () =>{
    document.querySelector('input').style.paddingLeft = '20px';
    document.querySelector('.search-container svg').style.opacity = '0';
}

const handleBlur = () =>{
    document.querySelector('input').style.paddingLeft = '50px';
    document.querySelector('.search-container svg').style.opacity = '1';
}

const handleSearch = (keyword) =>{
    emit('update:modelValue', keyword); 
}
</script>

<style lang="scss" scoped>
@import '../../style/color.scss';

.search-container{
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 2rem auto;

    input{
        background-color: rgba(127, 127, 126, 0.5) !important;
        border: 2px solid rgba(127, 127, 126, 0.5);
        outline: 0;
        padding: 12px 18px;
        padding-left: 50px;
        box-shadow: none;
        font-size: 18px;
        color: $text-color;
        border-radius: 30px;
        transition: all .2s ease-out;

        &::placeholder{
            color: rgb(141, 139, 139);  
            font-size: 18px;
        }

        &:focus{
            border: 2px solid #ffffff;
        }
    }

    svg{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        display: block;
        transition: all .2s ease-out;
    }
}
</style>