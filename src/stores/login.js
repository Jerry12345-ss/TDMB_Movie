import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { alertError } from '@/helper/alert_helper';
import { useFavoriteMovieStore } from './favorite';

export const users = [
    {
        name : 'Jerry',
        email : 'jerry12345@gmail.com',
        password : 'jerry12345'
    }
];

export const useLoginStore = defineStore('login', ()=>{
    const state = ref({
        user : null,
        token : null, 
    });

    const router = useRouter();
    const favoriteStore = useFavoriteMovieStore();

    const init = () =>{
        state.value.user = localStorage.getItem('user');
        state.value.token = localStorage.getItem('token');
    }

    const login = (value) =>{
        // 原本有 3 筆資料, 所以才會用 array.find()
        const result = users.find(data => data.email === value.email && data.password === value.password);

        if(result){
            // 這邊的 token 不是真的有意義的 token 
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6InRlc3QiLCJleHAiOjE3MTIxMTU0OTksImlzcyI6IlNpcml1cyJ9.qd9OBHhfw-4HWwwtOhkzQ33atRL6SZEH2Q-kvs0PjCY');
            localStorage.setItem('user', result.name);
            localStorage.setItem('movies', JSON.stringify([]));

            init();
            favoriteStore.init();
            
            router.push('/');
        }else{
            alertError({ title : '登入失敗', text : '帳號密碼錯誤!' });
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('movies');
        init();
        favoriteStore.$reset();
        router.push('/login');
    }

    return {
        state,
        init,
        login,
        logout
    };
});