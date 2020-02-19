import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3"

const NetworkConnection = axios.create({
  baseURL: BASE_URL,
  params : {
    api_key: process.env.TMDB_API_KEY
  }
});

export default NetworkConnection
