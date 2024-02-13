<template>
  <div class="bg-dark text-light">
    <NavBar v-if="isNavBarVisible" />
    <router-view />
    <AppFooter/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from './components/Footer.vue';

export default {
  name: "App",
  components: {
    NavBar,
    AppFooter
  },
  setup() {
    const route = useRoute();
    const isNavBarVisible = computed(() => {
      // Lista de nomes de rotas onde a NavBar não deve ser visível
      const noNavBarRoutes = ['LandingPage', 'Register', 'ForgotPassword', 'RecoverPassword'];
      return !noNavBarRoutes.includes(route.name);
    });
    return { isNavBarVisible };
  }
};
</script>

<style>
html {
  background-color: #212529;
}

body {
  max-width: 1960px;
  margin: auto!important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

.row
{
  --bs-gutter-x: unset!important;
  --bs-gutter-y: unset!important;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  min-height: 80vh;
  margin-top: 80px;
}

.content {
  width: 100%;
  max-width: 1920px;
}

.form-floating, .btn {
  max-width: 96%;
}

.whiteBorder {
  border: 1px solid #fff;
  border-radius: 2px;
  margin: 1%;
  max-width: 46% !important;
  padding: 2em;
  text-align: left;
}

.detailsContent {
  text-align: left;
}

.detailsContent h2 {
  color: rgb(170, 1, 1);
  font-weight: 600;
  padding: 0 20px 20px 0px;
}

.detailsContent strong {
  color: lightblue;
  font-weight: 600;
}

@media screen and (max-width: 991px) {
.container {
  margin-top: 30px;
}
}
@media screen and (max-width: 767px) {
.whiteBorder {
  border: 1px solid #fff;
  border-radius: 2px;
  margin: 1%;
  max-width: 98% !important;
}

.detailsContent {
  margin-top: 2em!important;
}
}
</style>
