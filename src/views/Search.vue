<template>
  <div class="search">
    <div class="container row">
      <div class="content bg-psrlz p-4 rounded">
        <h3 class="mb-4">Pesquisar</h3>
        <form @submit.prevent="register"></form>
        <div class="col-12 col-md 5 form-floating m-2">
          <input type="text" id="pesquisaFilmeSerie" v-model="searchTerm" class="form-control m-2" required>
          <label for="pesquisaFilmeSerie">Pesquisa por filme ou série</label>
        </div>
        <button @click="searchMovies" class="btn btn-success m-2">Pesquisar Filme</button>
        <button @click="searchSeries" class="btn btn-warning m-2">Pesquisar Série</button>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-md-4 col-lg-3 mb-4" v-for="item in searchResults" :key="item.id">
          <router-link :to="currentMediaType === 'movie' ? `/movies/${item.id}` : `/series/${item.id}`">
            <img :src="getImageUrl(item.poster_path)" alt="Poster" class="img-fluid" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      currentMediaType: '',
    };
  },
  methods: {
    async searchMovies() {
      this.currentMediaType = 'movie';
      await this.search('movie');
    },
    async searchSeries() {
      this.currentMediaType = 'tv';
      await this.search('tv');
    },
    async search(type) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };

      const url = `https://api.themoviedb.org/3/search/${type}?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(this.searchTerm)}`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const filteredResults = data.results.filter(result => {
          if (type === 'movie' || type === 'tv') {
            return result.poster_path !== null;
          } else if (type === 'person') {
            return result.profile_path !== null;
          }
          return true;
        });
        this.searchResults = filteredResults;
      } catch (err) {
        console.error(err);
      }
    },

    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
    }
  }
};
</script>


<style scoped>
.page {
  min-height: 100vh;
}

.bg-psrlz {
  background-color: #000;
  opacity: 0.96;
}

.container {
  min-height: 70vh;
  margin: 100px auto;
}

.content {
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
}

.img-fluid {
  max-width: 250px;
  border: solid 6px #fff;
  margin: 6px;
  height: 100%;
  object-fit: cover;
}

.bg-search {
  background-image: url('/img/landingPage.6f3744f1.jpg');
  background-position: center;
}

@media screen and (max-width: 575px) {
  .content {
    margin: 20px;
    max-width: 90%;
  }

}
</style>
