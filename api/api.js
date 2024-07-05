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
                include_adult : include_adult
                },
            });

            let finalData = response.data.results;

            if (genres){
                const genreList = await TMDB_API.get(`genre/${media_type}/list`)
          
                let genereList = genreList.data.genres.filter((genere) =>{
                  if (genere.name == genres){
                    return genere
                  };
                })
                
               finalData = finalData.filter((content)=>{
                  return content.genre_ids.includes(genereList[0].id)
                })
              }
          

            return finalData;
        }
        catch (error) { console.log(error);return `Error en la petición, codigo ${error.response.status}`; }
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

    static async health() {
        try {
            await TMDB_API.get(`/movie/606`);
            return true;
        }
        catch (error) { return false; }
  
    }

}

export default api;