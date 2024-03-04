<script setup>
import axios from "axios";
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const routeId = route.params.id;

const handleDelete = async () => {
  console.log(route, route.value);
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/${routeId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// modal to modify setup
const ModifyState = ref(false);
console.log(ModifyState);
function toggleModifyTrue() {
  ModifyState.value = true;
  console.log(ModifyState.value);
}
function toggleModifyFalse() {
  ModifyState.value = false;
  console.log(ModifyState.value);
}
</script>
<template>
  <div>
    <button to="/" @click.prevent="toggleModifyTrue()" class="delete-btn">
      Supprimer
    </button>
  </div>
  <div :class="['bg-modal', { hidden: !ModifyState }]">
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
      <div class="modal-content">
        <h3>confirmation</h3>
        <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
      </div>
      <div class="container-btn">
        <RouterLink
          to="/"
          @click="handleDelete()"
          type="submit"
          class="btn main-btn"
          >Supprimer</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style>
.modal-content {
  padding-inline: 15px;
}
.container-btn {
  display: flex;
  justify-content: flex-end;
  padding: 15px 15px;
}
.delete-btn {
  color: rgb(228, 44, 44);
  border: none;
  background-color: transparent;
  font-size: 1rem;
}
.delete-btn:hover {
  color: rgb(255, 0, 0);
  cursor: pointer;
  text-decoration: underline;
}
</style>
