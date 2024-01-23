
<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import {RouterView} from 'vue-router';

const props = defineProps({
    movie: {
        type: Object,
        required: false,
        default: null
    },
    id: {
        type: Number,
        required: false,
    },
});

const movieData = ref(props.movie);

if (!movieData.value) {
    const movieId = ref(props.id);

    onMounted(async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId.value}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
            });
            
            movieData.value = response.data;
    });
}

// Si la prop id change, réinitialise movieData à null pour indiquer le chargement
watch(() => props.id, (newId, oldId) => {
    if (newId !== oldId) {
        movieData.value = null;
        if (newId) {
            // Réexécute la requête si une nouvelle ID est fournie
            fetchMovie(newId);
        }
    }
});

async function fetchMovie(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        });
        movieData.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

// part to add video when hover
// document.addEventListener("DOMContentLoaded", function () {

// var youtubeContainer = document.querySelectorAll('.youtube-container')


// document.addEventListener("DOMContentLoaded", function () {
//   const cardHover = document.querySelectorAll('.card-movie-image-container');

//   cardHover.forEach(function (card) {
//     const cardInfo = card.querySelector('.card-movie-info-spawn');
//     card.addEventListener('mouseover', function () {
//       cardInfo.classList.add('active');
//       card.style.zIndex = '100';
//     });
//     card.addEventListener('mouseout', function () {
//       cardInfo.classList.remove('active');
//       card.style.zIndex = '1';
//     });
//   });

// })

// youtubeContainer.forEach(function (container) {
//   var dataYtb = container.getAttribute('data-ytbsrc');

//   const containerSpawner = container.querySelector('.youtube-container');
//   console.log(containerSpawner);

//   container.addEventListener('mouseover', function () {

//     console.log('mousse over');
//     // Créez un élément iframe

//     var iframe = document.createElement('iframe');

//     // Configurez les attributs de l'iframe
//     iframe.setAttribute('src', dataYtb);
//     iframe.setAttribute('frameborder', 0);

//     // Ajoutez l'iframe à la div en utilisant appendChild

//     container.appendChild(iframe);
//   });

//   container.addEventListener('mouseout', function () {
//     // Sélectionnez l'iframe précédemment ajouté
//     var iframeToRemove = container.querySelector('iframe');

//     // Vérifiez si l'iframe existe avant de tenter de le supprimer
//     if (iframeToRemove) {
//       console.log('iframeToRemove');
//       // Supprimez l'iframe de la div
//       container.removeChild(iframeToRemove);
//     }
//   });
// });

// });

</script>

<template>
    <div>
        
        <div v-if="movieData">
            <RouterLink :to="`/movie/${movieData.id}`">
            <div class="card-movie">
                <div class="card-movie-image-container">
                <div class="movie-169"></div>
                <!-- <div class="youtube-container"
                    data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
                </div> -->
                <div class="card-movie-info-spawn">

                    <div class="flex1">
                    <p class="card-movie-tittle-main font12">{{ movieData.title }}</p>
                    <div class="jc gap5 mt-1">
                        <div class="mini-chip font10">{{ movieData.category.name }}</div>
                        <p class="card-movie-tittle-second ">•</p>
                        <p class="card-movie-tittle-second font10">{{ movieData.duration }} minutes</p>
                    </div>
                    </div>
                    <div class="flex1 ">
                    <p class="card-movie-description font9">{{ movieData.description }}</p>
                    </div>

                </div>
                </div>
                <div class="card-movie-tittle">
                <p class="card-title">{{ movieData.title }}</p>
                <p class="card-subtitle">{{ movieData.category.name }}</p>
                </div>
            </div>
            </RouterLink>
        </div>
        <div v-else>
            Chargement en cours...
        </div>
    </div>
</template>

<style>
.card-movie {
  width: 200px;
  transition: 0.20s ease-out;
}

.card-movie-image-container {
  position: relative;
  transition: 0.20s ease-out;
  transform-origin: bottom ;
  border-radius: 6px;
}
.card-movie-image-container:hover {
  transform: scale(1.3);
  transition-delay:0.60s ;
  box-shadow: 0px 10px 20px 0px rgba(14, 14, 14, 0.775);
  z-index: 2;
}
.card-movie-image-container:hover + .card-movie-tittle {
  opacity: 0;
  transition-delay: 0.60s;
}
.card-movie-image-container:hover > .card-movie-info-spawn {
  padding: 4px 10px 10px 10px;
  height: 110px;
  opacity: 1;
  transition-delay: 0.60s;
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  height: fit-content;
}
.movie-169 {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-image: url(https://i.ytimg.com/vi/6R7NkPsjxag/maxresdefault.jpg);
  background-size: cover;
  background-position: center;
  border: 0;
  aspect-ratio: 16/9;
}
.card-movie-image-container:hover > .movie-169 {
    border-radius: 6px 6px 0 0;
}

.youtube-container {
  position: absolute;
	overflow: hidden;
	aspect-ratio: 16/9;
  border-radius: 6px 6px 0 0;
  width: 400px;
  top: 0;
  left: 0;
  width: 100%;
	
}
.youtube-container > iframe {
  width: 700%;
  height: 100%;
  margin-left: -300%;
  pointer-events: none;
}

iframe {
  pointer-events: none;
  transform: scale(1.4);
}
iframe:hover {
  pointer-events: none;
}
.card-movie-info-spawn {
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #232425;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0px 10px 20px 0px rgba(14, 14, 14, 0.775);

  display: flex;

  overflow: hidden;
  height: 0px;
  opacity: 0;

  transition: padding 0s ease-out, height 0s ease-out, opacity 0.20s ease-out;

}
.flex1 {
  flex: 1;
} 
.card-movie-description {
  font-size: 10px;
  color: var(--cream);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  pointer-events: none;
}
.card-movie-tittle {
  margin-top: 5px;
}
.card-movie-tittle-main {
  color: rgb(221, 215, 215);
  font-size: 14px;
  pointer-events: none;
}
.card-movie-tittle-second {
  font-size: 12px;
  font-weight: 600;
  color: rgb(101, 98, 98);
  pointer-events: none;
}
.card-movie-tittle:hover {
  cursor: pointer;
} 
.card-movie-tittle:hover > .card-movie-tittle-main {
  text-decoration: underline;
}
</style>