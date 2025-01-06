// api - https://api.themoviedb.org/3/search/movie/
// popilar - popular?language=en-US&page=1

import axios from 'axios'

export default class MoviesService {
  #apiBase = 'https://api.themoviedb.org/3/search/movie'
  #apiBaseSession = 'https://api.themoviedb.org/3'
  #optionBase = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYThlNzkyMTQ5YzI4MDZiZGMyN2UzMjNkZjA5MTljNiIsIm5iZiI6MTczNTU1MTc4NC42OTIsInN1YiI6IjY3NzI2YjI4YjcwMDEzY2MwZjYxNzg5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AQk6IocwsC_bSPUkZK2dPxuAEbLkHKnGZuWTuMRhD9c',
    },
  }

  async getResourse(url) {
    const response = await axios.get(`${this.#apiBase}${url}`, this.#optionBase)
    return response.data
  }

  async getPopularFilms(page = 1) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        this.#optionBase
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  getByNameFilms(name) {
    return this.getResourse(`?query=${name}&include_adult=false&language=en-US&page=1`)
  }

  async createGuestSession() {
    const response = await axios.get(`${this.#apiBaseSession}/authentication/guest_session/new`, this.#optionBase)
    localStorage.setItem('sessionKey', response.data.guest_session_id)
    return response.data
  }

  async addRating(movieId, rating, sessionId) {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating`,
        {
          value: `${rating}`,
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYThlNzkyMTQ5YzI4MDZiZGMyN2UzMjNkZjA5MTljNiIsIm5iZiI6MTczNTU1MTc4NC42OTIsInN1YiI6IjY3NzI2YjI4YjcwMDEzY2MwZjYxNzg5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AQk6IocwsC_bSPUkZK2dPxuAEbLkHKnGZuWTuMRhD9c',
            'Content-Type': 'application/json;charset=utf-8',
          },
          params: {
            guest_session_id: `${sessionId}`,
          },
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  async getRated(sessionId, page = 1) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      this.#optionBase
    )
    return response.data
  }

  async getGenres() {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', this.#optionBase)
    return response.data.genres
  }
}
