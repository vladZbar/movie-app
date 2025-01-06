import React, { createContext, useState, useEffect } from 'react'
import MoviesService from '../../API/MoviesServise'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [genres, setGenres] = useState([])
  const moviesService = new MoviesService()

  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await moviesService.getGenres()
      setGenres(fetchedGenres)
    }

    fetchGenres()
  }, [])

  return <AppContext.Provider value={genres}>{children}</AppContext.Provider>
}
