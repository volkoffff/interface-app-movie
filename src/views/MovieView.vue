<script setup>
import axios from 'axios';
import moment from 'moment';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import moviesCard from '../components/moviesCard.vue';
import SelectCategorie from '../components/SelectCategorie.vue';

const route = useRoute();
const routeId = route.params.id

const data = ref('');
const data2 = ref('');

const editedMovieTitle = ref('')
const editedMovieDescription = ref('')
const editedMovieDate = ref('')

const errorModificationJson = ref(null)

const selectedValue = ref(null);

function handleSelectionChange(value) {
  selectedValue.value = value;
}

onMounted(() => {
    load();
});

// Fonction pour charger les données du film
const load = async () => {

    const response = await axios.get(`http://127.0.0.1:8000/api/movies/${routeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    data.value = response.data;

    const cathegory = ref(data.value.category.id);
    const response2 = await axios.get(`http://127.0.0.1:8000/api/categories/${cathegory.value}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    data2.value = response2.data;

    //attribution of data for the modal 
    editedMovieTitle.value = data.value.title;
    editedMovieDescription.value = data.value.description;
    editedMovieDate.value = data.value.releaseDate.split('T')[0];
    selectedValue.value = data.value.category.name;

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
}




async function updateMovieTitle() {
    console.log(data.value);
    if (ModifyState) {
        try {
            const token = localStorage.getItem('authToken'); // Récupérer le token d'authentification
            if (!token) {
                //--- rediriger l'utilisateur vers la page de connexion
                this.$router.push('/');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/merge-patch+json',
            };

            const updatedMovie = reactive({ title: editedMovieTitle.value, description: editedMovieDescription.value, releaseDate: editedMovieDate.value, category:`/api/categories/${selectedValue.value}` }); // Nouveau titre du film

            // Envoyer la requête PATCH à l'API pour mettre à jour le titre du film
            await axios.patch(`http://127.0.0.1:8000/api/movies/${data.value.id}`, updatedMovie, { headers });

            // Réinitialiser après la mise à jour
            editedMovieTitle.value = '';
            editedMovieDescription.value = '';
            editedMovieDate.value = '';
            selectedValue.value = '';


            // Réinitialiser la sélection du film après modification
            ModifyState.value = false;

            // Rafraîchir la liste des films
            load();
            errorModificationJson.value = null

        } catch (error) {
            // Probleme validation des données
            if (error.response.status == 422) {
                errorModificationJson.value = textToJson(error.response.data["hydra:description"]);
            }
            console.error('Erreur lors de la mise à jour du du film :', error.response.data);
        }
    }
}

//scroll
// Fonction pour mettre à jour la taille du background en fonction du défilement
let backgroundSize = 120; // Taille initiale du background-size en pourcentage
const updateBackgroundSize = () => {
    const topMovie = document.querySelector('.top-movie');
    if (topMovie) {
        const scrollPosition = window.scrollY;
        // Modifiez la taille du background en fonction de la position de défilement
        backgroundSize = 120 - scrollPosition * 0.08; // Vous pouvez ajuster le coefficient selon vos besoins
        topMovie.style.backgroundSize = `${backgroundSize}%`;
    }
};

// Écoutez l'événement de défilement de la page et mettez à jour la taille du background
window.addEventListener('scroll', updateBackgroundSize);

// Assurez-vous de retirer l'écouteur d'événement lorsque le composant est détruit pour éviter des fuites de mémoire
onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateBackgroundSize);
});


// modal to modify setup
const ModifyState = ref(false)
console.log(ModifyState);
function toggleModifyTrue() {
    ModifyState.value = true
    console.log(ModifyState.value);
}
function toggleModifyFalse() {
    ModifyState.value = false
    console.log(ModifyState.value);
}


function textToJson(inputText) {
    const lines = inputText.split('\n');
    const result = {};

    lines.forEach(line => {
        // Utiliser une expression régulière pour extraire la clé et la valeur
        const match = line.match(/([^:]+): (.+)/);

        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            result[key] = value;
        }
    });

    return result;
}


</script>


<template>
    <div v-if="data">

        <div class="banner-movie">
            <div class="banner-movie-left">
                <div class="baner-movie-image-container"><img
                        src="https://fr.web.img5.acsta.net/pictures/23/04/03/15/05/1583867.jpg/r_5000_x"></div>
                <div class="baner-movie-title">{{ data.title }}</div>
                <RouterLink class="chip" :to="`/categorie/${data.category.id}`">
                    {{ data.category.name }}
                </RouterLink>
            </div>

            <div class="banner-movie-right">
            </div>
        </div>

        <div class="top-movie">

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
                            <p>•</p>
                            <p>{{ moment(data.releaseDate).format('LL') }}</p>
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
                        <button class="translucide-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z">
                                </path>
                            </svg>Bande annonce</button>
                        <div @click="toggleModifyTrue()" class="translucide-main-btn">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                                </path>
                            </svg>
                            Modifier
                        </div>
                    </div>
                </div> <!-- top-movie-bottom-left -->

            </div> <!-- .top-movie-bottom -->

        </div> <!-- .top-movie -->


        <div style="height: 100vh;">
            <div v-if="data2">
                <div v-for="(movie, index ) in data2.movies" :key="movie.id">
                    <div v-if="index < 8">
                        <moviesCard :id="movie.id" />
                    </div>
                </div>
            </div>
        </div>


        <div :class="['bg-modal', { 'hidden': !ModifyState }]">
            <div class="modal">
                <div class="modal-top">
                    <div @click="toggleModifyFalse()"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                            </path>
                        </svg></div>
                </div>
                <h2>Modification d'un Film</h2>
                <form @submit.prevent="updateMovieTitle" class="form-modal">
                    <div class="form-group">
                        <label for="editMovieTitle">Nom du film</label>
                        <input :class="[{ 'error-border': errorModificationJson && errorModificationJson.title }]"
                            type="text" class="form-control" id="editMovieTitle" v-model="editedMovieTitle"
                            :placeholder="data.title" />

                        <div class="error-text" v-if="errorModificationJson && errorModificationJson.title">• {{
                            errorModificationJson.title }}</div>
                    </div>

                    <div class="form-group">
                        <label for="editMovieDescription">Description</label>
                        <input :class="[{ 'error-border': errorModificationJson && errorModificationJson.description }]"
                            type="text" class="form-control" id="editMovieDescription" v-model="editedMovieDescription"
                            :placeholder="data.description" />

                        <div class="error-text" v-if="errorModificationJson && errorModificationJson.description">• {{
                            errorModificationJson.description }}</div>
                    </div>

                    <div class="form-group">
                        <label for="editMovieDate">Date de parution</label>
                        <input :class="[{ 'error-border': errorModificationJson && errorModificationJson.releaseDate }]"
                            type="date" class="form-control" id="editMovieDate" v-model="editedMovieDate"
                            :placeholder="data.date" />

                        <div class="error-text" v-if="errorModificationJson && errorModificationJson.releaseDate">• {{
                            errorModificationJson.releaseDate }}</div>
                    </div>

                    <SelectCategorie :defaultValue="data.category.id" @selection-changed="handleSelectionChange" v-model="selectedValue"/>
                    <p>{{ selectedValue }}</p>

                    <div class="container-btn">
                        <button type="submit" class="btn main-btn">Modifier</button>
                    </div>
                </form>
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
                    <p class="loading-line-700-80 loading"></p>
                    <p class="loading-line-200 loading"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.top-movie {
    height: 100vh;
    position: relative;
    background: linear-gradient( rgba(0, 0, 0, 0),var(--black-background) 70%), url(https://fr.web.img5.acsta.net/pictures/23/04/03/15/05/1583867.jpg/r_5000_x);
    background-size: 120%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.loading-top-movie {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
}

.loading-center {
    gap: 40px;
    padding: 40px;
    display: flex;
    align-items: flex-start;
}

.loading-image {
    height: 500px;
    aspect-ratio: 3/4;
}

.loading-text {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.loading-text>div {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.loading-head-line {
    height: 50px;
    width: 300px;
}

.loading-line-200 {
    height: 30px;
    width: 200px;
}

.loading-line-500 {
    height: 30px;
    width: 500px;
}

.loading-line-700-80 {
    height: 80px;
    width: 700px;
}</style>