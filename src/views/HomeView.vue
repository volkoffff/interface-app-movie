<script setup>
import actorsCard from "../components/actorsCard.vue";
import moviesCard from "../components/moviesCard.vue";

import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";

const data = ref("");
const dataActor = ref("");

onMounted(async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/movies`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
  data.value = response.data["hydra:member"];
});

onMounted(async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/actors`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
  dataActor.value = response.data["hydra:member"];
});

onMounted(() => {
  function moveSlider() {
    const containerSlider = document.querySelector(".slider-movies-container");
    const slider = document.getElementById("slider-movies1");
    const slider2 = document.getElementById("slider-movies2");
    const slider3 = document.getElementById("slider-movies3");

    if (slider && slider2 && slider3) {
      const scrollY = window.scrollY || window.pageYOffset;

      // Ajustez la valeur de déplacement en fonction du scroll
      const displacement = scrollY * 0.2;
      const displacement2 = scrollY * 0.3;
      const displacement3 = scrollY * 0.3;

      // Applique la transformation CSS pour déplacer la div
      slider.style.transform = `translateX(${displacement}px)`;
      slider2.style.transform = `translateX(-${displacement2}px)`;
      slider3.style.transform = `translateX(${displacement3}px)`;
      containerSlider.style.transform = `rotateX(${
        32 + displacement * 0.06
      }deg) rotateZ(28deg) rotateY(-22deg)`;
    }
  }

  // Attachez l'événement scroll pour appeler la fonction de déplacement
  window.addEventListener("scroll", moveSlider);

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", moveSlider);
  });
});
</script>

<template>
  <div class="slider-movies-container">
    <div class="slider-movies" id="slider-movies1">
      <img src="https://images.cinefil.com/movies/1067186.webp" alt="" />
      <img
        src="https://www.netcost-security.fr/wp-content/uploads/2022/09/GoldenEye-007-sur-Xbox-est-une-realite-resolution-4K-758x426.jpg"
        alt=""
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJvl75oY37lEarxWCH-s2AMyxBBKAycVXcUQ&usqp=CAU"
        alt=""
      />
      <img
        src="https://e1.pxfuel.com/desktop-wallpaper/108/703/desktop-wallpaper-iron-man-3-poster-iron-man-poster.jpg"
        alt=""
      />
      <img
        src="https://photos.tf1.fr/1200/720/vignette-16-9-5ee994-32f302-0@1x.jpg"
        alt=""
      />
      <img
        src="https://images.ladepeche.fr/api/v1/images/view/5c2df3923e454644d57d00f0/hd/image.jpg?v=1"
        alt=""
      />
      <img src="https://images.cinefil.com/movies/1067186.webp" alt="" />
    </div>

    <div class="slider-movies" id="slider-movies2">
      <img src="https://images.cinefil.com/movies/1067186.webp" alt="" />
      <img
        src="https://www.disneyphile.fr/wp-content/uploads/2021/11/spider-man-no-way-home-affiche-2-960x1287.jpg"
        alt=""
      />
      <img
        src="https://i0.wp.com/blog.son-video.com/wp-content/uploads/2021/03/ZackSnyders_JusticeLeague_1200.jpg?resize=696%2C392&ssl=1"
        alt=""
      />
      <img
        src="https://www.picclickimg.com/ViQAAOSwMn9gVN6a/LA-LIGNE-VERTE-The-Green-Mile-Affiche-Cinema.webp"
        alt=""
      />
      <img
        src="https://imgsrc.cineserie.com/2023/09/2759304.jpg?ver=1"
        alt=""
      />
      <img src="https://images.cinefil.com/movies/1067186.webp" alt="" />
      <img
        src="data:image/jpeg;base64,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"
        alt=""
      />
      <img
        src="https://bibliosff.files.wordpress.com/2022/07/interstellar-affiche-film.jpg"
        alt=""
      />
      <img
        src="https://m.media-amazon.com/images/I/714b1KQmskL._AC_UF1000,1000_QL80_.jpg"
        alt=""
      />
      <img
        src="https://images.caradisiac.com/images/3/3/4/3/193343/S0-route-de-nuit-baby-driver-l-enfance-de-l-art-cinematographique-698112.jpg"
        alt=""
      />
    </div>

    <div class="slider-movies" id="slider-movies3">
      <img src="https://images.cinefil.com/movies/1067186.webp" alt="" />
      <img
        src="https://m.media-amazon.com/images/I/71zEIB3ekZL._AC_UF1000,1000_QL80_.jpg"
        alt=""
      />
      <img
        src="https://m.media-amazon.com/images/I/51ws1BUT3EL._AC_UF1000,1000_QL80_.jpg"
        alt=""
      />
      <img
        src="https://i.pinimg.com/736x/93/71/a8/9371a865e821ae1029a440f9271252b0.jpg"
        alt=""
      />
      <img
        src="data:image/jpeg;base64,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"
        alt=""
      />
      <img
        src="https://www.closeupshop.fr/media/oart_0/oart_k/oart_92216/961464_G877640.JPG"
        alt=""
      />
      <img
        src="https://www.premiere.fr/sites/default/files/styles/partage_rs/public/2018-05/Prisoners.jpg"
        alt=""
      />
      <img
        src="https://m.media-amazon.com/images/I/61jgxOJyDWL._AC_UF1000,1000_QL80_.jpg"
        alt=""
      />
      <img
        src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/86911/86464/Thor_2_The_Dark_World_poster_buy_original_movie_posters_at_starstills__51815__41810.1611769949.jpg?c=2"
        alt=""
      />
      <img
        src="https://m.media-amazon.com/images/I/61jgxOJyDWL._AC_UF1000,1000_QL80_.jpg"
        alt=""
      />
      <img
        src="https://superseven.fr/img/movie/poster/taxi%20driver.jpg"
        alt=""
      />
    </div>
  </div>

  <div class="home-container">
    <div class="home-top">
      <h1>
        Muvy Le site favori des <span class="text-blue">Cinéphiles</span>
      </h1>
      <p>
        Cette plateforme pemet aux utilisateurs de noter leurs film préférer et
        de partager leurs gouts. Les modérateurs peuvent ajouter et modifier la
        liste de films
      </p>
    </div>

    <p class="recommendation-title">Populaires</p>
    <div>
      <div v-if="data" class="container-list">
        <moviesCard
          v-for="(movie, index) in data.slice(0, 12)"
          :key="movie.id"
          :id="movie.id"
          :movie="movie"
        />
      </div>
      <div v-else class="container-list">
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
      </div>
    </div>
  </div>

  <div>
    <p class="recommendation-title">Derniers ajouts</p>
    <div>
      <div v-if="data" class="container-list">
        <moviesCard
          v-for="(movie, index) in data.slice(12, 24)"
          :key="movie.id"
          :id="movie.id"
          :movie="movie"
        />
      </div>
      <div v-else class="container-list">
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
      </div>
    </div>
  </div>

  <div>
    <p class="recommendation-title">Categorie 5</p>
    <div>
      <div v-if="data" class="container-list">
        <moviesCard
          v-for="(movie, index) in data"
          :key="movie.id"
          :id="movie.id"
          :movie="movie"
          v-show="movie.category.name == 'catergory5'"
        />
      </div>
      <div v-else class="container-list">
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
      </div>
    </div>
  </div>

  <div>
    <p class="recommendation-title">meilleurs acteurs</p>
    <div v-if="dataActor" class="container-list">
      <actorsCard
        v-for="(actor, index) in dataActor.slice(0, 12)"
        :key="actor.id"
        :actor="actor"
      />
    </div>
    <div v-else class="container-list">
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
      <div class="actor-card-loading loading"></div>
    </div>
  </div>

  <div>
    <p class="recommendation-title">Categorie 7</p>
    <div>
      <div v-if="data" class="container-list">
        <moviesCard
          v-for="(movie, index) in data"
          :key="movie.id"
          :id="movie.id"
          :movie="movie"
          v-show="movie.category.name == 'catergory7'"
        />
      </div>
      <div v-else class="container-list">
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
        <div class="recommendation-loading loading"></div>
      </div>
    </div>
  </div>
</template>
