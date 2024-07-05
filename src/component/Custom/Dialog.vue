<template>
    <div class="dialog-mask">
        <div class="dialog-container">
            <div class="dialog-header d-flex justify-content-between align-items-center dilaog-area">
                <slot name="header"></slot>
                <button @click="handleClose"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></button>
            </div>
            <div class="dialog-main">
                <div class="dialog-content dilaog-area">
                    <slot></slot>
                </div>
                <div class="dialog-footer dilaog-area">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// defineOptions({
//     inheritAttrs : false
// });

const emit = defineEmits(['close']);

const handleClose = () =>{
    emit('close'); 
}

onMounted(()=>{
    window.addEventListener('click', (event)=>{
        toggleDialog(event)  
    });
});

onUnmounted(()=>{
    window.removeEventListener('click', (event)=>{
        toggleDialog(event) 
    });
});

const toggleDialog = (event) =>{
    const dialog = document.querySelector('.dialog-mask');

    if(event.target === dialog){
        emit('close');
    }
}
</script>

<style scoped lang="scss">
.dialog-mask{
    position: fixed; 
    z-index: 5000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 45px;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-out;
    transform: scale(1.0);

    .dialog-container{
        background-color: #ffffff;
        max-width: 700px;
        margin: auto;
        width: 100%;
        border-radius: 6px;
        

        .dialog-header{
            border-bottom: 1px solid rgb(195, 194, 194);
            padding: 20px;
        }

        .dialog-main{
            padding: 30px;

            .dialog-content{
                font-size: 18px !important;
            }
        }
    }
}

.dialog-mask.show{
    visibility: visible;
    opacity: 1;
    transform: scale(1.08);
    transition: all .3s ease-out;
}
</style>