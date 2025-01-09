import React, { Component } from 'react'
import MoviesService from '../../API/MoviesServise'
import ItemList from '../ItemList/ItemList'
import cl from '../MovieList/MovieList.module.css'
import Loader from '../UI/Loader'
import { Pagination } from 'antd'
import Error from '../UI/Error'
import Message from '../UI/Message'
import { AppContext } from '../App/AppContext'

export default class MovieRated extends Component {
  state = {
    ratedMovies: [],
    loading: true,
    error: false,
    page: 1,
    total: 0,
  }

  static contextType = AppContext

  moviesService = new MoviesService()

  fetchMovies = async (page = 1) => {
    const res = await this.moviesService.getRated(this.props.guestSessionId, page)
    this.setState({
      ratedMovies: res.results,
      loading: false,
      error: false,
      total: res.total_results,
    })
  }

  pageChange = (page) => {
    this.setState({ page: page, loading: true })
    this.fetchMovies(page)
  }

  componentDidMount() {
    this.fetchMovies()
  }

  genresFilter(ids, genres) {
    return genres.filter((obj) => ids.includes(obj.id))
  }

  render() {
    const { ratedMovies, loading, error, total, page } = this.state
    const { guestSessionId } = this.props
    const genres = this.context

    const elements = ratedMovies.map((movie) => (
      <ItemList
        key={movie.id}
        movie={movie}
        title={movie.original_title}
        realeaseDate={movie.release_date}
        description={movie.overview}
        guestSessionId={guestSessionId}
        filteredGenres={this.genresFilter(movie.genre_ids, genres)}
        raiting={movie.vote_average.toFixed(1)}
      />
    ))
    return (
      <div>
        <ul className={cl.wrapList}>
          {error ? <Error /> : false}
          {!loading ? elements : <Loader />}
        </ul>
        {!loading && ratedMovies.length && Number(total) > 20 ? (
          <Pagination
            style={{ marginBottom: '20px', justifySelf: 'center' }}
            current={page}
            onChange={this.pageChange}
            total={total}
            pageSize={20}
            showSizeChanger={false}
          />
        ) : (
          false
        )}
      </div>
    )
  }
}
