<template>
    <div class="iframe-container">
        <iframe
            width="100%"
            height="100%"
            :src="`https://www.youtube-nocookie.com/embed/${link}`"
            :title="title"
            frameborder="0"
            allow="accelerometer; autoplay;"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script setup>
const { title, link } = defineProps(['title', 'link']);
</script>

<style scoped lang="scss">
.iframe-container{
    position: relative;
    width: 100%;
    overflow: hidden;
    // padding-top: 56.25%;
    // 底下這寫法是參考別人的, 用上面這個在顯示上會怪怪的
    aspect-ratio: 16/9;
    max-width: 500px;
    margin: {
        left: 1.5rem;
        right : 1.5rem;
        bottom: 1.5rem;
    };
    flex-shrink: 0; // 預設值為1, 當在 flex 內元件空個不足時, 內元件會自動縮小, 設定為 0 代表不縮放

    &:first-child{
        margin-left: 0;
    }

    &:last-child{
        margin-right: 0;
    }

    iframe{
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
}
</style>