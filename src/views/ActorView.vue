<script setup>

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios'
import moviesCard from '../components/moviesCard.vue';

const route = useRoute();
const routeId = route.params.id;
const data = ref('');

onMounted(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/actors/${routeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    data.value = response.data;
})

</script>

<template>

<div v-if="data">

    <div class="top-movie" >

        <div class="top-movie-cache"></div>

        <div class="top-movie-bottom">
            <div>
                <img src="https://fr.web.img5.acsta.net/pictures/23/04/03/15/05/1583867.jpg/r_5000_x" >
            </div>
            <div class="top-movie-bottom-left">
                <div class="gap10 flexcol">
                    <h2 class="top-movie-bottom-tittle">{{ data.firstName }} {{ data.lastName }}</h2>
                    <div class="jc">
                        <div class="chip">
                            {{ data.nationalite.nationalite }}
                        </div>
                    </div>
                </div>
                <div class="mini-section">
                    <p class="subtittle">Meilleurs apparition</p>
                    <div class="top-movie-bottom-acteurs">
                        <div v-for="(movie, index) in data.movies" v>
                            <div class="jc" v-if="index < 5">
                                <RouterLink class="underline-hover" :to="`/movie/${movie.id}`">
                                    {{movie.title}}
                                </RouterLink>
                                <p>•</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="jc">
                    <button class="translucide-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></svg>Vidéo biographie</button>
                    <div @click="toggleModifyTrue()" class="translucide-main-btn">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                        Modifier
                    </div>
                </div>
            </div> <!-- top-movie-bottom-left -->

        </div> <!-- .top-movie-bottom -->

    </div> <!-- .top-movie -->
    
    <p class="recommendation-title">Film avec apparition de l'acteur</p>
    <div class="container-list">
      <div v-for="movie in data.movies" :key="movie.id" >
          <moviesCard :id="movie.id" />
      </div>
    </div>


</div>

<div v-else>
    <div class="loading-top-movie">
        <div class="loading-center">
            <div class="loading-image loading"></div>
            <div class="loading-text">
                <div>
                    <p class="loading-head-line loading"></p>
                    <p class="loading-line-500 loading"></p>
                </div>
                <p class="loading-line-200 loading"></p>
                <p class="loading-line-700-80 loading"></p>
            </div>
        </div>
    </div>
</div>

</template>