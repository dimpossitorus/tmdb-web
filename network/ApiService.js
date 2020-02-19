import NetworkConnection from "./Network";

let genresList = new Map()

async function getCategories() {
  if (genresList.size === 0) {
    await NetworkConnection.get('/genre/movie/list')
      .then(response => {
        response.data.genres.map(genre => {
          genresList.set(genre.id, genre.name)
        })
      })
      .catch(err => {

      })
  }
}

export async function getDiscoverMovies(page, sort_by, releaseAfter, releaseBefore) {
  await getCategories()
  return await NetworkConnection.get('discover/movie',
    {
      params: {
        'page': page,
        'sort_by': sort_by,
        'primary_release_date.gte': releaseAfter,
        'primary_release_date.lte': releaseBefore
      }
    }
  )
    .then(response => {
      let movies = response.data
      movies.results.map(movie => {
        let genres = []
        for (let index in movie.genre_ids) {
          genres.push(genresList.get(movie.genre_ids[index]))
        }
        movie.genres = genres
      })
      return Promise.resolve(movies)
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return Promise.reject(error)
    });
}

export async function getMovieDetail(movieId) {
  await getCategories()
  return await NetworkConnection.get(`movie/${movieId}`)
    .then(response => {
      let movie = response.data
      return Promise.resolve(movie)
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return Promise.reject(error)
    });
}
