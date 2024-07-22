<template>
    <div class="pagination-container d-flex justify-content-center align-items-center flex-wrap my-3">
        <button class="btn btn-primary prev-btn" @click="handlePrev">上一頁</button>
        <span style="color: #ffffff; padding: 0 15px;">{{ props.modelValue }} / {{ props.total }}</span>
        <button class="btn btn-primary prev-btn" @click="handleNext">下一頁</button>
        
        <div class="d-flex justify-content-center align-items-center my-3">
            <span style="color: #ffffff; padding: 0 15px;">跳至</span>
            <input type="text" class="form-control" style="width: 100px;" @keydown.enter="handleGoto" v-model.number.trim="gotoNumber">
            <span style="color: #ffffff; padding: 0 15px;">頁</span>
            <span class="question" @click="showDialog">?</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['total', 'modelValue']);
const emit = defineEmits(['click', 'update:modelValue']);

const gotoNumber = ref(null);

// 這邊要做 +1、-1 不能解構, 不然會無法做加減處理
const handlePrev = () =>{
    if(props.modelValue > 1){
        emit('update:modelValue', props.modelValue - 1); 
    }
}

const handleNext = () =>{
    if(props.modelValue !== props.total && props.modelValue <= 499){
        emit('update:modelValue', props.modelValue + 1);
    }
}

const handleGoto = () =>{  
    if(typeof gotoNumber.value !== 'number' || !Number.isInteger(gotoNumber.value)){
        return;
    }else{
        if(gotoNumber.value > props.total){
            gotoNumber.value = props.total;
        }

        if(gotoNumber.value > 500){
            gotoNumber.value = 500;
        }
        
        if(gotoNumber.value < 1){
            gotoNumber.value = 1;
        }

        emit('update:modelValue', gotoNumber.value);
    }
}

const showDialog = () =>{
    emit('click');
}
</script>

<style scoped lang="scss">
@import '../../style/color.scss';

button{
    background-color: transparent !important;
    border: 2px solid rgb(86, 86, 86) !important;
    color: rgb(203, 201, 201);
    transition: all .2s ease-out;

    &:hover{
        background-color: rgb(38, 38, 38) !important;
    }
}

input{
    background-color: transparent !important;
    border: 2px solid rgb(86, 86, 86) !important;
    color: $text-color !important;
}
.question{
    background-color: #ffffff;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid $text-color;
    transition: all .2s ease-out;

    &:hover{
        background-color: transparent;
        color: $text-color;
    }
}
</style>