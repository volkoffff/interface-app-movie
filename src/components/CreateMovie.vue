<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import MultiSelect from "../components/MultiSelect.vue";
import Selectcategorie from "./selectcategorie.vue";

const route = useRoute();

const errorModificationJson = ref(null);

// create actual date for date picker
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so adding 1
const day = currentDate.getDate().toString().padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

const data = ref("");
const title = ref("");
const description = ref("");
const duration = ref(0);
const date = ref(formattedDate);
const categorie = ref(null);
const actors = ref([]);
const informationsDuEnfant = ref(null);

function recevoirInfoDuEnfant(informations) {
  // Fonction qui reçoit les informations du composant enfant
  informationsDuEnfant.value = informations;
  actors.value = informationsDuEnfant.value.map((id) => `/api/actors/${id}`);
  console.log(informationsDuEnfant.value);
}

function handleSelectionChange(value) {
  categorie.value = value;
}

const addMovie = async () => {
  const editedMovie = {
    title: title.value,
    description: description.value,
    duration: duration.value,
    releaseDate: date.value,
    category: `/api/categories/${categorie.value}`,
    actors: actors.value,
  };
  console.log(editedMovie);
  errorModificationJson.value = null;
  try {
    await axios.post(`http://127.0.0.1:8000/api/movies`, editedMovie, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    // Réinitialiser la sélection du film après modification
    EditState.value = false;

    // Rafraîchir la liste des films
    errorModificationJson.value = null;
  } catch (error) {
    if (error.response.status == 422) {
      errorModificationJson.value = textToJson(
        error.response.data["hydra:description"]
      );
    }
    if (error.response.status == 400) {
    }
    console.error(
      "Erreur lors de la mise à jour du du film :",
      error.response.data
    );
  }
};

function textToJson(inputText) {
  const lines = inputText.split("\n");
  const result = {};

  lines.forEach((line) => {
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

// --------------------------------------------------------------------------------------------------------------
// modal to modify setup
const EditState = ref(false);
console.log(EditState);
function toggleModifyTrue() {
  EditState.value = true;
  console.log(EditState.value);
}
function toggleModifyFalse() {
  EditState.value = false;
  console.log(EditState.value);
}
</script>

<template>
  <button class="main-btn" @click.prevent="toggleModifyTrue()">
    Ajouter un film
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      t="1551322312294"
      viewBox="0 0 1024 1024"
      version="1.1"
      pId="10297"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <path
        d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
        pId="10298"
      ></path>
      <path
        d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
        pId="10299"
      ></path>
    </svg>
  </button>

  <div :class="['bg-modal', { hidden: !EditState }]">
    <div class="modal">
      <div class="modal-top">
        <div @click="toggleModifyFalse()">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path>
          </svg>
        </div>
      </div>
      <h2>Ajout d'un Film</h2>
      <form @submit.prevent="addMovie" class="form-modal">
        <div class="form-group">
          <label for="editMovieTitle">Nom du film</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.title,
              },
            ]"
            type="text"
            class="form-control"
            id="editMovieTitle"
            v-model="title"
            placeholder="titre du film"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.title"
          >
            • {{ errorModificationJson.title }}
          </div>
        </div>

        <div class="form-group">
          <label for="editMovieDescription">Description</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.description,
              },
            ]"
            type="text"
            class="form-control"
            id="editMovieDescription"
            v-model="description"
            placeholder="une description du film"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.description"
          >
            • {{ errorModificationJson.description }}
          </div>
        </div>

        <div class="form-group">
          <label for="editMovieDuration">Duration</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.duration,
              },
            ]"
            type="number"
            class="form-control"
            id="editMovieDuration"
            v-model="duration"
            placeholder="une duration du film"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.duration"
          >
            • {{ errorModificationJson.duration }}
          </div>
        </div>

        <div class="form-group">
          <label for="editMovieDate">Date de parution</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.releaseDate,
              },
            ]"
            type="date"
            class="form-control"
            id="editMovieDate"
            v-model="date"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.releaseDate"
          >
            • {{ errorModificationJson.releaseDate }}
          </div>
        </div>

        <Selectcategorie
          @selection-changed="handleSelectionChange"
          v-model="categorie"
          ><div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.category"
          >
            • {{ errorModificationJson.category }}
          </div>
        </Selectcategorie>

        <div class="form-group">
          <label>Acteurs dans le film </label>
          <MultiSelect @infoAuParent="recevoirInfoDuEnfant" >
            <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.actors"
          >
            • {{ errorModificationJson.actors }}
          </div>
          </MultiSelect>
        </div>

        <div class="container-btn">
          <button type="submit" class="btn main-btn">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
