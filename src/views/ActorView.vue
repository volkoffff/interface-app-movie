<script setup>

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios'

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
                <p>•</p>
                <p>{{ data.nationalite.nationalite }}</p>
                <p>•</p>
                <p>aa</p>
            </div>
        </div>
        <div class="mini-section">
            <p class="subtittle">Description</p>
            <p class="top-movie-bottom-description">
                aaa
            </p>
        </div>

        <div class="mini-section">
            <p class="subtittle">Acteurs</p>
            <div class="top-movie-bottom-acteurs">
                <div v-for="actor in data.actors">
                    <div class="jc ">
                        <RouterLink class="underline-hover">
                            aaaa
                        </RouterLink>
                        <p>•</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="jc">
            <button class="translucide-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></svg>Bande annonce</button>
            <div @click="toggleModifyTrue()" class="translucide-main-btn">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                Modifier
            </div>
        </div>
    </div> <!-- top-movie-bottom-left -->

</div> <!-- .top-movie-bottom -->

</div> <!-- .top-movie -->

        {{ data.firstName }} {{ data.lastName }}
        {{ data.nationalite.nationalite }}
        
        <div v-for="movie in data.movies">
            <RouterLink :to="`/movie/${movie.id}`">
                {{ movie.title }}
            </RouterLink>
        </div>


    </div>

</template>