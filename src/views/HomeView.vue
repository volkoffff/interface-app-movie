<script setup>

import moviesCard from '../components/moviesCard.vue';
import actorsCard from '../components/actorsCard.vue';

import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');
const dataActor = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/movies');
    data.value = response.data["hydra:member"];
})

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/actors');
    dataActor.value = response.data["hydra:member"];
})


document.addEventListener("DOMContentLoaded", function() {
  console.log('dom chargé');
});





document.addEventListener("DOMContentLoaded", function() {

  var youtubeContainer = document.querySelectorAll('.youtube-container')

 
  youtubeContainer.forEach(function(container) {
      var frame = container.querySelector('iframe');
      var dataYtb = container.getAttribute('data-ytbsrc');
      console.log(dataYtb);

      container.addEventListener('mouseover', function() {
        console.log('affichage iframe');
        // Créez un élément iframe
        var iframe = document.createElement('iframe');
        
        // Configurez les attributs de l'iframe
        iframe.setAttribute('src', dataYtb);
        iframe.setAttribute('frameborder', 0);
        
        // Ajoutez l'iframe à la div en utilisant appendChild
        container.appendChild(iframe);
      });

      container.addEventListener('mouseout', function() {
        // Sélectionnez l'iframe précédemment ajouté
        var iframeToRemove = container.querySelector('iframe');
        
        // Vérifiez si l'iframe existe avant de tenter de le supprimer
        if (iframeToRemove) {
          console.log('iframeToRemove');
          // Supprimez l'iframe de la div
          container.removeChild(iframeToRemove);
        }
      });
    });

});


</script>

<template>

    <h1>
      Bienvenu sur la page d'accueil !
    </h1>

    <div>

      <h3>Liste des derniers ajouts</h3>
      <div v-for="(movie, index) in data" :key="movie.id">
        <div v-if="index < 4">
          <moviesCard :movie="movie" />
        </div>
      </div>

    </div>

    <br>
    <hr>
    <br>

    <div>

      <h3>Liste des meilleurs acteurs</h3>
      <div v-for="(actor, index) in dataActor" :key="actor.id">
        <div v-if="index < 4">
          <actorsCard :actor="actor" />
        </div>
      </div>


      <!-- <div class="youtube-container" data-ytbsrc="https://www.youtube.com/embed/WhY7uyc56ms?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
      </div>     
    
      <div class="youtube-container" data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?autoplay=1&loop=1&color=white&controls=0&mute=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
      </div> -->

      <div class="card-container">

        <div class="card-movie">
          <div class="card-movie-image-container">
            <img class="movie-169" src="https://www.geekjunior.fr/wp-content/uploads/2023/04/miraculous.jpg" alt="">
            <div class="youtube-container" data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
          </div>
          <div class="card-movie-tittle">
            <p class="card-movie-tittle-main">Miraculous</p>
            <p class="card-movie-tittle-second">Action</p>
          </div>
        </div>

        <div class="card-movie">
          <div class="card-movie-image-container">
            <img class="movie-169" src="https://www.geekjunior.fr/wp-content/uploads/2023/04/miraculous.jpg" alt="">
            <div class="youtube-container" data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
          </div>
          <div class="card-movie-tittle">
            <p class="card-movie-tittle-main">Miraculous</p>
            <p class="card-movie-tittle-second">Action</p>
          </div>
        </div>

        <div class="card-movie">
          <div class="card-movie-image-container">
            <img class="movie-169" src="https://www.geekjunior.fr/wp-content/uploads/2023/04/miraculous.jpg" alt="">
            <div class="youtube-container" data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
          </div>
          <div class="card-movie-tittle">
            <p class="card-movie-tittle-main">Miraculous</p>
            <p class="card-movie-tittle-second">Action</p>
          </div>
        </div>

        <div class="card-movie">
          <div class="card-movie-image-container">
            <img class="movie-169" src="https://www.geekjunior.fr/wp-content/uploads/2023/04/miraculous.jpg" alt="">
            <div class="youtube-container" data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
          </div>
          <div class="card-movie-tittle">
            <p class="card-movie-tittle-main">Miraculous</p>
            <p class="card-movie-tittle-second">Action</p>
          </div>
        </div>





      </div>
        
    </div>
    
    <!-- &mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&&rel=0&enablejsapi=1& -->

</template>
