<template>
  <div class="movies">
    <div class="container py-4">
      <h2 class="visibleMobile">Filmes</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3 mb-4" v-for="movie in movies" :key="movie.id">
          <router-link :to="`/movies/${movie.id}`" class="movie-item">
            <img :src="getImageUrl(movie.poster_path)" alt="Poster do Filme" class="img-fluid" />
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <button @click="fetchMovies(true)" class="btn btn-primary">Ver Mais</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      page: 1
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies(loadMore = false) {
      if (loadMore) {
        this.page++;
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };

      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${this.page}&sort_by=popularity.desc`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        // Filtrar filmes que possuem imagem
        const moviesWithImages = data.results.filter(movie => movie.poster_path !== null);
        if (loadMore) {
          this.movies = [...this.movies, ...moviesWithImages];
        } else {
          this.movies = moviesWithImages;
        }
      } catch (err) {
        console.error(err);
      }
    },

    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    }
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.container {
  min-height: 70vh;
}

.content {
  width: 100%;
  max-width: 800px;
}

h2 {
  color: rgb(170, 1, 1);
  font-weight: 600;
  padding: 0 20px 20px 20px;
}

.img-fluid {
  max-width: 100%;
  border: solid 6px #fff;
  margin: 6px;
  height: 100%;
  object-fit: cover;
}

.movie-item {
  color: #fff;
  text-decoration: none;
  color: inherit;
}

.movie-item:hover {
  text-decoration: none;
}

@media screen and (min-width: 992px) {
  .visibleMobile {
  display: none;
}
}
</style>