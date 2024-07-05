import { ref } from "vue";
import axios from 'axios';
import { alertError } from "@/helper/alert_helper";

// axios config 寫法
export const useAxios = () => {
    const loading = ref(false);
    const data = ref(null);
    const error = ref(null);

    const fetchData = async(config) =>{
        loading.value = true;

        try{
            const result = await axios(config);
            data.value = result.data;
        }catch(err){
            error.value = err.response.data?.message;
            alertError({}, err);
        }finally{
            loading.value = false;
        }
    }

    return {
        loading,
        data,
        error,
        fetchData
    }
}