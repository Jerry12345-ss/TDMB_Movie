import './style/main.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './helper/axios_helper';
import './validate';

import App from './App.vue';
import router from './router';
import { useLoginStore } from './stores/login';
import { useFavoriteMovieStore } from './stores/favorite';
import { useMovieStore } from './stores/movie';

const app = createApp(App)

app.use(createPinia())
   .use(router)

app.mount('#app')

const loginStore = useLoginStore()
const favoriteStore = useFavoriteMovieStore()
const movieStore = useMovieStore();
loginStore.init()
favoriteStore.init()

movieStore.fetchPopular();
