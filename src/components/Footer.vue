<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <footer class="footer">
    <div class="footer__addr">
      <h1 class="footer__logo">Muvy</h1>

      <h2>Contact</h2>

      <address>
        9 Rue Quebec, 10430 Rosières-prés-Troyes<br />

        <a class="footer__btn" href="mailto:muvy@gmail.com">Email Us</a>
      </address>
    </div>

    <ul class="footer__nav">
      <li class="nav__item">
        <h2 class="nav__title">Navigation</h2>

        <ul class="nav__ul">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>

          <li>
            <RouterLink to="/movies">Movies</RouterLink>
          </li>

          <li>
            <RouterLink to="/actors">Actors</RouterLink>
          </li>

          <li>
            <RouterLink to="/categories">Categories</RouterLink>
          </li>
        </ul>
      </li>

      <li class="nav__item nav__item--extra">
        <h2 class="nav__title">Contact</h2>

        <ul class="nav__ul nav__ul--extra">
          <li>
            <a href="https://www.iut-troyes.univ-reims.fr/">IUT</a>
          </li>

          <li>
            <a href="https://www.iut-troyes.univ-reims.fr/but-mmi/">MMI</a>
          </li>

          <li>
            <a href="https://www.youtube.com/channel/UCWUb2Cve8oqtD2LRc_a_kzA"
              >Youtube</a
            >
          </li>

          <li>
            <a
              href="https://www.iut-troyes.univ-reims.fr/formation-aux-entreprises.html"
              >Entreprise</a
            >
          </li>
        </ul>
      </li>

      <li class="nav__item">
        <h2 class="nav__title">Legal</h2>

        <ul class="nav__ul">
          <li>
            <a href="#">Privacy Policy</a>
          </li>

          <li>
            <a href="#">Terms of Use</a>
          </li>

          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </li>
    </ul>

    <div class="legal">
      <p>&copy; 2024 Robin Lanfranchi. All rights reserved.</p>
    </div>
  </footer>
</template>

<style>
.footer {
  margin-top: 70px;
  display: flex;
  flex-flow: row wrap;
  padding: 30px 30px 20px 30px;
  color: #b9b2b2;
  background-color: #25252a;
  border-top: 1px solid #3b3b42;
}

.footer > * {
  flex: 1 100%;
}

.footer__addr {
  margin-right: 1.25em;
  margin-bottom: 2em;
}

.footer__logo {
  font-weight: 700;
  font-size: 1.99rem;
  color: var(--main);
}

.footer__addr h2 {
  margin-top: 1.3em;
  font-size: 15px;
  font-weight: 400;
}

.nav__title {
  font-weight: 400;
  font-size: 15px;
}

.footer address {
  font-style: normal;
  color: #999;
}

.footer__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  max-width: max-content;
  background-color: rgb(33, 33, 33, 0.07);
  border-radius: 100px;
  color: #2f2f2f;
  line-height: 0;
  margin: 0.6em 0;
  font-size: 1rem;
  padding: 0 1.3em;
}

.footer ul {
  list-style: none;
  padding-left: 0;
}

.footer li {
  line-height: 2em;
}

.footer a {
  text-decoration: none;
}

.footer__nav {
  display: flex;
  flex-flow: row wrap;
}

.footer__nav > * {
  flex: 1 50%;
  margin-right: 1.25em;
}

.nav__ul a {
  color: #999;
}

.nav__ul--extra {
  column-count: 2;
  column-gap: 1.25em;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  color: #999;
}

.legal__links {
  display: flex;
  align-items: center;
}

.heart {
  color: #2f2f2f;
}

@media screen and (min-width: 24.375em) {
  .legal .legal__links {
    margin-left: auto;
  }
}

@media screen and (min-width: 40.375em) {
  .footer__nav > * {
    flex: 1;
  }

  .nav__item--extra {
    flex-grow: 2;
  }

  .footer__addr {
    flex: 1 0px;
  }

  .footer__nav {
    flex: 2 0px;
  }
}
</style>
