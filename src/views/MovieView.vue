<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import axios from 'axios';

const route = useRoute();
const routeId = route.params.id;

const data = ref('');
let backgroundSize = 120; // Taille initiale du background-size en pourcentage

onMounted(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/movies/${routeId}`);
    data.value = response.data;
});

// Fonction pour mettre à jour la taille du background en fonction du défilement
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
                        <button class="translucide-main-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-208 0H400v-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16z"></path></svg>Louer</button>
                    </div>
                </div>
            </div>

        </div>
        <div style="height: 100vh;">

        </div>
            


    </div>

</template>