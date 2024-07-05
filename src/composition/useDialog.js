import { ref } from "vue"

export const useDialog = () =>{
    const show = ref(false);

    const showDialog = () =>{
        show.value = true;
    }

    const hiddenDialog = () =>{
        show.value = false;
    }

    return {
        show, 
        showDialog,
        hiddenDialog
    }
}