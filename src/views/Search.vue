<template>
  <div class="search-page">
    <div class="search-container">
      <h3 class="search-title">Pesquisar</h3>
      <div class="search-form">
        <input type="text" id="pesquisaFilmeSerie" v-model="searchTerm"
          placeholder="Pesquisar por título do filme ou série" class="search-input">
        <div class="search-buttons">
          <button @click="searchMovies" class="btn btn-movie">Pesquisar Filme</button>
          <button @click="searchSeries" class="btn btn-series">Pesquisar Série</button>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="genreSelectMovies" class="labelGenre">Género de Filme:</label>
            <select id="genreSelectMovies" v-model="selectedGenreMovies" class="form-control">
              <option v-for="genreMovies in genreOptionsMovies" :value="genreMovies.id" :key="genreMovies.id">
                {{ genreMovies.name }}
              </option>
            </select>
          </div>

          <button @click="searchByGenreMovies" class="btn btn-movie">Pesquisar Filme</button>
        </div>
        <div class="col-6">

          <div class="form-group">
            <label for="genreSelectSeries" class="labelGenre">Género de Série:</label>
            <select id="genreSelectSeries" v-model="selectedGenreSeries" class="form-control">
              <option v-for="genreSeries in genreOptionsSeries" :value="genreSeries.id" :key="genreSeries.id">
                {{ genreSeries.name }}
              </option>
            </select>
          </div>
          <button @click="searchByGenreSeries" class="btn btn-series">Pesquisar Série</button>
        </div>
      </div>

      <div class="m-2"><h4>Pesquisou por: {{searchText}}</h4></div>

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
      selectedGenreMovies: 28,
      selectedGenreSeries: 16,
      searchText: '',
      genreOptionsMovies: [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ],
      genreOptionsSeries: [
        {
          "id": 10759,
          "name": "Action & Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 10762,
          "name": "Kids"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10763,
          "name": "News"
        },
        {
          "id": 10764,
          "name": "Reality"
        },
        {
          "id": 10765,
          "name": "Sci-Fi & Fantasy"
        },
        {
          "id": 10766,
          "name": "Soap"
        },
        {
          "id": 10767,
          "name": "Talk"
        },
        {
          "id": 10768,
          "name": "War & Politics"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]
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

      searchText = searchTerm;

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

    async searchByGenreMovies() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };

      const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=${this.selectedGenreMovies}`;

      searchText = 'Categoria de Filmes';

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.searchResults = data.results.filter(result => result.poster_path !== null);
      } catch (err) {
        console.error(err);
      }
    },
    async searchByGenreSeries() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };

      const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=${this.selectedGenreSeries}`;

      searchText = 'Categoria de Séries';

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.searchResults = data.results.filter(result => result.poster_path !== null);
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
  /* background-image: url('~@/assets/images/landingPage.jpg'); */
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

.btn-movie,
.btn-series {
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
  gap: 10px;
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

#genreSelectMovies,
#genreSelectSeries {
  max-width: 90%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.labelGenre {
  margin-top: 10px;
  width: 100%;
}

@media screen and (max-width: 991px) {
  .search-container {
  margin-top: 10px;
}

}
</style>
