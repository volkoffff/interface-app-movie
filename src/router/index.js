import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'
import MovieView from '../views/MovieView.vue'
import ActorsView from '../views/ActorsView.vue'
import ActorView from '../views/ActorView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import CategorieView from '../views/CategorieView.vue'
import MovieEditView from '../views/MovieEditView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/movie/edit/:id',
      name: 'movieEdit',
      component: MovieEditView
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: ActorView
    },
    {
      path: '/categorie/:id',
      name: 'categorie',
      component: CategorieView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

  ]
})

export default router
