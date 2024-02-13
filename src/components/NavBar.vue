<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-dark row">
    <div class="d-none col-lg-1"></div>
    <div class="col-2 col-lg-1">
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="col-8 col-lg-10">
      <router-link to="/home" class="navbar-brand mx-auto noBgColor">
        <img src="@/assets/logo.png" alt="Logo" class="navbar-logo">
      </router-link>
    </div>
    <div class="navbar-nav ml-auto col-2 col-lg-1" v-if="isLoggedIn">
      <div class="w-100">
        <img v-if="avatarUser" :src="`/assets/images/avatars/${avatarUser}.png`" alt="avatar" class="avatarUserNav">
        <div class="usernameText"><span>{{ username }} </span><a class="logoutLink" @click="logout">(sair)</a></div>
      </div>
    </div>

    <div class="collapse navbar-collapse" id="navbarNav" ref="navbarMenu">
      <ul class="navbar-nav">
        <li class="nav-item" @click="closeMenu">
          <router-link class="nav-link" to="/Home">Home</router-link>
        </li>
        <li class="nav-item" @click="closeMenu">
          <router-link class="nav-link" to="/Profile">Perfil</router-link>
        </li>
        <li class="nav-item" @click="closeMenu">
          <router-link :class="['nav-link', { 'router-link-active': isActiveMovies }]" to="/Movies">Filmes</router-link>
        </li>
        <li class="nav-item" @click="closeMenu">
          <router-link :class="['nav-link', { 'router-link-active': isActiveSeries }]" to="/Series">Séries</router-link>
        </li>
        <li class="nav-item" @click="closeMenu">
          <router-link class="nav-link" to="/Search">Pesquisa</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isLoggedIn: localStorage.getItem('authToken') !== null,
      username: localStorage.getItem('username') || 'Utilizador',
      avatarUser: localStorage.getItem('avatarUser'),
    };
  },
  computed: {
  isActiveMovies() {
    return this.$route.path === '/Movies' || this.$route.path.startsWith('/movies/');
  },
  isActiveSeries() {
    return this.$route.path === '/Series' || this.$route.path.startsWith('/series/');
  }
},

  methods: {
    toggleMenu() {
      this.$refs.navbarMenu.classList.toggle('show');
    },
    closeMenu() {
      this.$refs.navbarMenu.classList.remove('show');
    },
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      localStorage.removeItem('avatarUser');
      this.isLoggedIn = false;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.navbar.navbar-dark.navbar-expand-lg.bg-dark.row {
  max-width: 100%;
  margin: auto;
}

.navbar-nav {
  padding-right: 10px;
}

.navbar-logo {
  height: 40px;
  background-color: unset !important;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.1);
  margin-right: 10px;
  margin-left: 10px;
  padding: 6px;
}

.navbar-collapse {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-item {
  width: 200px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity));
}

nav a.router-link-exact-active {
  color: gainsboro;
}

.nav-link:hover {
  background: lightblue;
  color: #000;
}

.noBgColor {
  background-color: transparent !important;
}

nav a.router-link-exact-active {
  background-color: cadetblue;
  color: #fff;
}

a.logoutLink {
  font-size: 11px;
  color: rgb(170, 1, 1);
  padding: 0;
  cursor: pointer;
}

a.logoutLink:hover {
  background-color: rgb(170, 1, 1);
  color: white;
}

.avatarUserNav {
  width: 42px;
  height: 42px;
}

.usernameText {
  font-size: 11px;
  max-width: 100%;
  max-height: 20px;
  line-height: 11px;
}

.usernameText span {
  max-width: 60px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  padding-right: 3px;
  height: 10px;
}

@media screen and (min-width: 992px) {

  .navbar.navbar-dark.navbar-expand-lg.bg-dark {
    margin-bottom: 50px;
  }
}
</style>