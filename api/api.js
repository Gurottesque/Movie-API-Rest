import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  });

  
class api {


    static async search({ page = '1', region, language = 'en-US', query, genres, include_adult=false }, media_type) {

        try {
            const response = await TMDB_API.get(`/search/${media_type}`, {
                params: {
                page: page,
                language: language,
                query: query,
                region: region,
                },
            });

            let finalData = response.data.results;

            if (genres) {
                finalData = response.data.results.filter((movie) => {
                    return movie.genre_ids.some((genreId) => genres.includes(genreId));
                });
            }

            return finalData;
        }
        catch (error) { return `Error en la petición, codigo ${error.response.status}`; }
    }

    static async getData(id, media_type) {

        try {
            const response = await TMDB_API.get(`/${media_type}/${id}`);
            return response.data;
        }
        catch (error) { return `Error en la petición, codigo ${error.response.status}`; }

    }

    static async getTrending(time_window, media_type) {

        try {
            const response = await TMDB_API.get(`/trending/${media_type}/${time_window}`);
            return response.data;
        }
        catch (error) { return `Error en la petición, codigo ${error.response.status}`; }

    }

}

export default api;