import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import axios from 'axios';

export const useMovieStore = defineStore('movie', ()=>{
    // const popularMovies = ref([]); 
    // const loading = ref(false);
    const popularMovies = reactive({
        data : null,
        loading : false
    });

    const fetchPopular = async() =>{
        // loading.value = true;
        popularMovies.loading = true;

        try{
            const result = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                headers : {
                    Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTQ0NmY0OTVmYmFlYzZlZGIyNDRiNjRjMzZhZWNmMyIsInN1YiI6IjY2MThjYWEwM2FjZDIwMDE3YzQ2OGMwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88SryXEf4CEwjJo2EBi5SvPzCVqLA738DP8FVJrBbME'
                }
            });
            // popularMovies.value = result.data.results
            popularMovies.data = result.data.results
        }catch(error){
            console.error(error);
        }finally{
            // loading.value = false;
            popularMovies.loading = false
        }
    }
    return {
        // loading,
        // popularMovies,
        popularMovies,
        fetchPopular 
    };
});