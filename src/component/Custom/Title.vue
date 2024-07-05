<template>
    <!-- 如果 root node 只有一個可以不用額外處理, 會 auto fallthrough attributes, 但有多個 root nodes 則需要透過 v-bind 綁定 $attrs -->
    <h2 :style="{ color : color || '#ffffff', fontSize : size + 'px' || '30px' }">{{ title }}</h2>
</template>

<script setup>

const { title, color } = defineProps({
    title : String,
    color : String,
    size : String
});
</script>

<style scoped lang="scss">
@import '../../style/color.scss';

h2{
    padding-left: 18px;
    margin: 2rem 0;
    position: relative;

    &::before{
        content: '';
        background-color: $theme-color;
        height: 100%;
        width: 5px;
        left: 0;
        position: absolute;
    }
}
</style>