import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../component/Layout/Layout.vue';
import Home from '../page/Home.vue';
import Login from '../page/Login.vue';
import Error404 from '../page/error/Error404.vue';

import { useLoginStore } from '@/stores/login';
import { storeToRefs } from 'pinia';

const routes = [
  {
    path : '/',
    name : 'Layout',
    component : Layout,
    meta : {
      requiresAuth : true
    },
    children : [
      {
        // Home Page
        path : '',
        name : 'Home',
        alias : ['/home', '/index'],
        component : Home
      },
      {
        path : 'movies',
        redirect : {
          name : 'Search'
        },
        children : [
          {
            // Search Page
            path : 'search',
            name : 'Search',
            component : ()=> import('../page/Search.vue') 
          },
          {
            // Favorite Page
            path : 'favorite',
            name : 'Favorite',
            component : ()=> import('../page/Favorite.vue')
          },
          // categories
          {
            path : 'categories',
            name : 'Categories',
            redirect : {
              name : 'Popular'
            },
            children : [
              {
                path : 'popular',
                name : 'Popular',
                component : ()=> import('../page/categories/Popular.vue')
              },
              {
                path : 'top',
                name : 'Top',
                component : ()=> import('../page/categories/Top.vue')
              },
              {
                path : 'upcoming',
                name : 'Upcoming',
                component : ()=> import('../page/categories/Upcoming.vue')
              }
            ]
          },
          // genres
          {
            path : 'genres',
            name : 'Genres',
            redirect : {
              name : 'Action'
            },
            children : [
              {
                path : 'action',
                name : 'Action',
                component : ()=> import('../page/genres/Action.vue')
              },
              {
                path : 'adventure',
                name : 'Adventure',
                component : ()=> import('../page/genres/Adventure.vue')
              },
              {
                path : 'animation',
                name : 'Animation',
                component : ()=> import('../page/genres/Animation.vue')
              },
              {
                path : 'comedy',
                name : 'Comedy',
                component : ()=> import('../page/genres/Comedy.vue')
              },
              {
                path : 'crime',
                name : 'Crime',
                component : ()=> import('../page/genres/Crime.vue')
              },
              {
                path : 'documentary',
                name : 'Documentary',
                component : ()=> import('../page/genres/Documentary.vue')
              },
              {
                path : 'drama',
                name : 'Drama',
                component : ()=> import('../page/genres/Drama.vue')
              },
              {
                path : 'family',
                name : 'Family',
                component : ()=> import('../page/genres/Family.vue')
              },
              {
                path : 'fantasy',
                name : 'Fantasy',
                component : ()=> import('../page/genres/Fantasy.vue')
              },
              {
                path : 'history',
                name : 'History',
                component : ()=> import('../page/genres/History.vue')
              },
              {
                path : 'horror',
                name : 'Horror',
                component : ()=> import('../page/genres/Horror.vue')
              },
              {
                path : 'music',
                name : 'Music',
                component : ()=> import('../page/genres/Music.vue')
              },
              {
                path : 'mystery',
                name : 'Mystery',
                component : ()=> import('../page/genres/Mystery.vue')
              },
              {
                path : 'romance',
                name : 'Romance',
                component : ()=> import('../page/genres/Romance.vue')
              },
              {
                path : 'science',
                name : 'Science',
                component : ()=> import('../page/genres/Science.vue')
              },
              {
                path : 'thriller',
                name : 'Thriller',
                component : ()=> import('../page/genres/Thriller.vue')
              },
              {
                path : 'tv',
                name : 'TV',
                component : ()=> import('../page/genres/TV.vue')
              },
              {
                path : 'war',
                name : 'War',
                component : ()=> import('../page/genres/War.vue')
              },
              {
                path : 'western',
                name : 'Western',
                component : ()=> import('../page/genres/Western.vue')
              }
            ]
          },
          {
            path : ':id',
            name : 'MovieDetail',
            component : ()=> import('../page/Movie.vue'),
            meta : {
              watchParams : 'id'
            }
          }
        ]
      }
    ],
  },
  {
    // Login Page
    path : '/login',
    name : 'Login',
    component : Login
  },
  {
    // Catch All
    path : '/:pathMatch(.*)*',
    name : 'Catch All',
    component : Error404
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition){
    return {
      top : 0,
      behavior : 'smooth'
    }
  }
});

router.beforeEach((to, from)=>{
  const loginStore = useLoginStore();
  const { state } = storeToRefs(loginStore);
  const routeAuth = to.matched.some(record => record.meta.requiresAuth);

  if(routeAuth && (routeAuth === true)){
    if(!state.value.token){
      return {
        name : 'Login'
      }
    }
  }else{
    if(state.value.token){
      if(to.name === 'Login'){
        return {
          name : 'Home'
        }
      }
    }
  }
})

export default router
