<script setup>

import moviesCard from '../components/moviesCard.vue';
import actorsCard from '../components/actorsCard.vue';

import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');
const dataActor = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/movies', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    data.value = response.data["hydra:member"];
})

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/actors', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    dataActor.value = response.data["hydra:member"];
})


document.addEventListener("DOMContentLoaded", function() {

  var youtubeContainer = document.querySelectorAll('.youtube-container')

 
  youtubeContainer.forEach(function(container) {
      var dataYtb = container.getAttribute('data-ytbsrc');

      const containerSpawner = container.querySelector('.youtube-container');
      console.log(containerSpawner);

      container.addEventListener('mouseover', function() {
        
        console.log('mousse over');
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


document.addEventListener("DOMContentLoaded", function() {
  const cardHover = document.querySelectorAll('.card-movie-image-container');
  
  cardHover.forEach(function(card) {
    const cardInfo = card.querySelector('.card-movie-info-spawn');
    card.addEventListener('mouseover', function() {
      cardInfo.classList.add('active');
      card.style.zIndex = '100';
    });
    card.addEventListener('mouseout', function() {
      cardInfo.classList.remove('active');
      card.style.zIndex = '1';
    });
  });

})


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
            <div class="movie-169"></div>
            <div class="youtube-container"   data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
            <div class="card-movie-info-spawn">
              
                <div class="flex1">
                  <p class="card-movie-tittle-main font12">Miraculous</p>
                  <div class="jc gap5 mt-1">
                    <div class="mini-chip font10">Action</div>
                    <p class="card-movie-tittle-second ">•</p><p class="card-movie-tittle-second font10">98 minutes</p>
                  </div>
                </div>
                <div class="flex1 ">
                  <p class="card-movie-description font9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum mollitia maxime magni quisquam modi fugit voluptates error ea dolor delectus reprehenderit laudantium amet sequi libero impedit debitis, necessitatibus et suscipit.</p>
                </div>
             
            </div>
          </div>
          <div class="card-movie-tittle">
            <p class="card-movie-tittle-main">Miraculous</p>
            <p class="card-movie-tittle-second">Action</p>
          </div>
        </div>
        <div class="card-movie">
          <div class="card-movie-image-container"  >
            <div class="movie-169"></div>
            <div class="youtube-container"   data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
            <div class="card-movie-info-spawn">
              
                <div class="flex1">
                  <p class="card-movie-tittle-main font12">Miraculous</p>
                  <div class="jc gap5 mt-1">
                    <div class="mini-chip font10">Action</div>
                    <p class="card-movie-tittle-second ">•</p><p class="card-movie-tittle-second font10">98 minutes</p>
                  </div>
                </div>
                <div class="flex1 ">
                  <p class="card-movie-description font9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum mollitia maxime magni quisquam modi fugit voluptates error ea dolor delectus reprehenderit laudantium amet sequi libero impedit debitis, necessitatibus et suscipit.</p>
                </div>
             
            </div>
          </div>
          <div class="card-movie-tittle">
            <p class="card-movie-tittle-main">Miraculous</p>
            <p class="card-movie-tittle-second">Action</p>
          </div>
        </div>
        
        <div class="card-movie">
          <div class="card-movie-image-container">
            <div class="movie-169"></div>
            <div class="youtube-container"   data-ytbsrc="https://www.youtube-nocookie.com/embed/QidIZNU91Xs?si=n5u8Jj4q_urYPI2s&amp;autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1">
            </div>
            <div class="card-movie-info-spawn">
              
                <div class="flex1">
                  <p class="card-movie-tittle-main font12">Miraculous</p>
                  <div class="jc gap5 mt-1">
                    <div class="mini-chip font10">Action</div>
                    <p class="card-movie-tittle-second ">•</p><p class="card-movie-tittle-second font10">98 minutes</p>
                  </div>
                </div>
                <div class="flex1 ">
                  <p class="card-movie-description font9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum mollitia maxime magni quisquam modi fugit voluptates error ea dolor delectus reprehenderit laudantium amet sequi libero impedit debitis, necessitatibus et suscipit.</p>
                </div>
             
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
