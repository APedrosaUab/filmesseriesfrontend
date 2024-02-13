<template>
  <div class="search-page">
    <div class="search-container">
      <h3 class="search-title">Pesquisar</h3>
      <div class="search-form">
        <input type="text" id="pesquisaFilmeSerie" v-model="searchTerm" placeholder="Pesquisar por filme ou série" class="search-input">
        <div class="search-buttons">
          <button @click="searchMovies" class="btn btn-movie">Pesquisar Filme</button>
          <button @click="searchSeries" class="btn btn-series">Pesquisar Série</button>
        </div>
      </div>
      <div class="search-results">
        <div class="search-result-card" v-for="item in searchResults" :key="item.id">
          <router-link :to="currentMediaType === 'movie' ? `/movies/${item.id}` : `/series/${item.id}`">
            <img :src="getImageUrl(item.poster_path)" alt="Poster" class="result-image" />
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
.search-page {
  padding: 20px;
  background-image: url('~@/assets/images/landingPage.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.search-container {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: auto;
  margin-top: 80px;
}

.search-title {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-bottom: 20px;
}

.search-buttons {
  display: flex;
  gap: 10px;
}

.btn-movie, .btn-series {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-movie {
  background-color: #28a745;
}

.btn-series {
  background-color: #ffc107;
}

.btn-movie:hover {
  background-color: #218838;
}

.btn-series:hover {
  background-color: #e0a800;
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.search-result-card {
  width: 200px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.result-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

</style>
