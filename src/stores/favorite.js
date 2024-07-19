import { ref } from "vue";
import { defineStore } from 'pinia';

export const useFavoriteMovieStore = defineStore('favorite', ()=>{
    const movies = ref(null);

    const init = () =>{
        movies.value = JSON.parse(localStorage.getItem('movies'));
    }

    const addMovie = (movie) =>{ 
        const result = checkMovies(movie);

        if(!result){
            movies.value.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies.value));
            init();
        }

        return result;
    }

    const removeMovie = (movie) =>{
        const isMovieExist = movies.value.find(item => item.id === movie.id);

        if(isMovieExist){
            const result = movies.value.filter(item => item.id !== movie.id);
            localStorage.setItem('movies', JSON.stringify(result));
            init();   
        }else{
            return;
        }
    }

    const checkMovies = (movie) =>{
        return movies.value.find(item => item.id === movie.id);
    }

    const $reset = () =>{
        localStorage.setItem('movies', JSON.stringify([]));
        init();
    }

    return {
        movies,
        addMovie,
        removeMovie,
        $reset,
        init
    };
})