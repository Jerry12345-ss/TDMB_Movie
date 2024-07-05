import axios from "axios";

// api key : d5446f495fbaec6edb244b64c36aecf3
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TMDB_KEY;

// 這邊的設定主要 for TDMB api, 但如果我們有需要做比如需要 call 後端 api 夾帶 token, 作法可能就會要用 axios.create() 
axios.interceptors.request.use((request)=>{
    if(token){
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, (error)=>{
    return Promise.reject(error);
});

axios.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    return Promise.reject(error);
})