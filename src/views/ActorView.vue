<script setup>

import { useRoute } from 'vue-router';
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import moviesCard from '../components/moviesCard.vue';

const route = useRoute();
const routeId = route.params.id;
const data = ref('');

const editedActorFisrtName = ref('')
const editedActorLastName = ref('')

const errorModificationJson = ref(null)

onMounted(() => {
    load();
});

const load = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/actors/${routeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    data.value = response.data;

    
    //attribution of data for the modal 
    editedActorFisrtName.value = data.value.firstName;
    editedActorLastName.value = data.value.lastName;
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

            const updatedActor = reactive({ firstName: editedActorFisrtName.value, lastName: editedActorLastName.value }); // Nouveau titre du film
            // Envoyer la requête PATCH à l'API pour mettre à jour le titre du film
            await axios.patch(`http://127.0.0.1:8000/api/actors/${data.value.id}`, updatedActor, { headers });

            // Réinitialiser après la mise à jour
            editedActorFisrtName.value = '';
            editedActorLastName.value = '';

            // Réinitialiser la sélection du film après modification
            ModifyState.value = false;

            // Rafraîchir la liste des films
            load();
            errorModificationJson.value = null

        } catch (error) {
            // Probleme validation des données
            // Probleme validation des données
            if (error.response.status == 422) {
                errorModificationJson.value = textToJson(error.response.data["hydra:description"]);
            }
            console.error('Erreur lors de la mise à jour du du film :', error.response.data);
        }
    }
}

// modal to modify setup
const ModifyState = ref(false)
console.log(ModifyState);
function toggleModifyTrue() {
    ModifyState.value = true
}
function toggleModifyFalse() {
    ModifyState.value = false
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

        <div class="top-movie">

            <div class="top-movie-cache"></div>

            <div class="top-movie-bottom">
                <div>
                    <img src="https://fr.web.img5.acsta.net/pictures/23/04/03/15/05/1583867.jpg/r_5000_x">
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
                                        {{ movie.title }}
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
                            </svg>Vidéo biographie</button>
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

        <p class="recommendation-title">Film avec apparition de l'acteur</p>
        <div class="container-list">
            <div v-for="movie in data.movies" :key="movie.id">
                <moviesCard :id="movie.id" />
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
                        <label for="editMovieTitle">Prénom</label>
                        <input :class="[{ 'error-border': errorModificationJson && errorModificationJson.firstName }]"
                            type="text" class="form-control" id="editMovieTitle" v-model="editedActorFisrtName"
                            :placeholder="data.firstName" />

                        <div class="error-text" v-if="errorModificationJson && errorModificationJson.firstName">• {{
                            errorModificationJson.firstName }}</div>
                    </div>

                    <div class="form-group">
                        <label for="editMovieDescription">Nom</label>
                        <input :class="[{ 'error-border': errorModificationJson && errorModificationJson.lastName }]"
                            type="text" class="form-control" id="editMovieDescription" v-model="editedActorLastName"
                            :placeholder="data.lastName" />

                        <div class="error-text" v-if="errorModificationJson && errorModificationJson.lastName">• {{
                            errorModificationJson.lastName }}</div>
                    </div>

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
                <p class="loading-line-200 loading"></p>
                <p class="loading-line-700-80 loading"></p>
            </div>
        </div>
    </div>
</div></template>