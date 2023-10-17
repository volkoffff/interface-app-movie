<script setup>
import moviesCard from '../components/moviesCard.vue';
import { useRoute, RouterLink, RouterView } from 'vue-router';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import axios from 'axios';

const route = useRoute();
const routeId = route.params.id

const data = ref('');
const data2 = ref('');

    console.log(routeId);
onMounted(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/movies/${routeId}`);
    data.value = response.data;
    const cathegory = ref(data.value.category.id);
    const response2 = await axios.get(`http://127.0.0.1:8000/api/categories/${cathegory.value}`);
    data2.value = response2.data;


    // Fonction pour ajouter la classe "active" au banner-movie au scroll de 80vh
    function addActiveClassOnScroll() {
    const bannerMovie = document.querySelector('.banner-movie');


    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calcul de 80vh
        const eightyVH = (windowHeight * 60) / 100;

        if (scrollPosition >= eightyVH) {
        bannerMovie.classList.add('active');
        } else {
        bannerMovie.classList.remove('active');
        }
    });
    }

    // Appel de la fonction pour l'activer
    addActiveClassOnScroll();

});


//scroll
// Fonction pour mettre à jour la taille du background en fonction du défilement
let backgroundSize = 120; // Taille initiale du background-size en pourcentage
const updateBackgroundSize = () => {
    const topMovie = document.querySelector('.top-movie');
    if (topMovie) {
        const scrollPosition = window.scrollY;
        // Modifiez la taille du background en fonction de la position de défilement
        backgroundSize = 120 - scrollPosition * 0.05; // Vous pouvez ajuster le coefficient selon vos besoins
        topMovie.style.backgroundSize = `${backgroundSize}%`;
    }
};

// Écoutez l'événement de défilement de la page et mettez à jour la taille du background
window.addEventListener('scroll', updateBackgroundSize);

// Assurez-vous de retirer l'écouteur d'événement lorsque le composant est détruit pour éviter des fuites de mémoire
onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateBackgroundSize);
});


</script>


<template>

    <div v-if="data">

        <div class="banner-movie">
            <div class="banner-movie-left">
                <div class="baner-movie-image-container"><img src="https://fr.web.img5.acsta.net/pictures/23/04/03/15/05/1583867.jpg/r_5000_x"></div>
                <div class="baner-movie-title">{{ data.title }}</div>
                <RouterLink class="chip" :to="`/categorie/${data.category.id}`">
                    {{ data.category.name }}
                </RouterLink>
            </div>

            <div class="banner-movie-right">
            </div>
        </div>

        <div class="top-movie" >

            <div class="top-movie-cache"></div>

            <div class="top-movie-bottom">
                <div>
                    <img src="https://fr.web.img5.acsta.net/pictures/23/04/03/15/05/1583867.jpg/r_5000_x">
                </div>
                <div class="top-movie-bottom-left">
                    <div class="gap10 flexcol">
                        <h2 class="top-movie-bottom-tittle">{{ data.title }}</h2>
                        <div class="jc">
                            <RouterLink class="chip" :to="`/categorie/${data.category.id}`">
                                {{ data.category.name }}
                            </RouterLink>
                            <p>•</p>
                            <p>{{ data.duration }} minutes</p>
                        </div>
                    </div>
                    <div class="mini-section">
                        <p class="subtittle">Description</p>
                        <p class="top-movie-bottom-description">
                            {{ data.description }}
                        </p>
                    </div>

                    <div class="mini-section">
                        <p class="subtittle">Acteurs</p>
                        <div class="top-movie-bottom-acteurs">
                            <div v-for="actor in data.actors">
                                <div class="jc ">
                                    <RouterLink class="underline-hover" :to="`/actor/${actor.id}`">
                                        {{ actor.firstName }} {{ actor.lastName }}
                                    </RouterLink>
                                    <p>•</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="jc">
                        <button class="translucide-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></svg>Bande annonce</button>
                        <RouterLink :to="`/movie/edit/${data.id}`" :data="data" class="translucide-main-btn">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            Modifier
                        </RouterLink>
                    </div>
                </div> <!-- top-movie-bottom-left -->

            </div> <!-- .top-movie-bottom -->

        </div> <!-- .top-movie -->


        <div style="height: 100vh;">
            <div v-if="data2">
                <div v-for="(movie, index ) in data2.movies" :key="movie.id">
                    <div v-if="index < 3">
                        <moviesCard :id="movie.id"/>
                    </div>
                </div>
            </div>
        </div>
            
        
    
    </div>


</template>