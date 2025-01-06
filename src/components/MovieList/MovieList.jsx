import { Component } from 'react'
import { debounce } from 'lodash'
import ItemList from '../ItemList/ItemList'
import cl from './MovieList.module.css'
import MoviesService from '../../API/MoviesServise'
import Loader from '../UI/Loader'
import Error from '../UI/Error'
import SearchForm from '../SearchForm/SearchForm'
import { Pagination } from 'antd'
import Message from '../UI/Message'
import { AppContext } from '../App/AppContext'

export default class MovieList extends Component {
  state = {
    movies: [],
    ratedMovies: [],
    loading: true,
    error: false,
    searchName: '',
    page: 1,
    total: 0,
  }

  static contextType = AppContext

  moviesService = new MoviesService()

  fetchMovies = async (searchName, page) => {
    this.setState({ loading: true })
    try {
      const res = searchName
        ? await this.moviesService.getByNameFilms(searchName, page)
        : await this.moviesService.getPopularFilms(page)
      this.setState({
        movies: res.results,
        loading: false,
        error: false,
        total: res.total_pages,
      })
    } catch (err) {
      this.setState({ error: true, loading: false, movies: [] })
    }
  }

  fetchMoviesDebounced = debounce((searchName) => {
    this.fetchMovies(searchName, 1)
  }, 1000)

  handleSearchChange = (e) => {
    const { value } = e.target
    this.setState({ searchName: value, page: 1 })
    this.fetchMoviesDebounced(value, this.state.page)
  }

  pageChange = (page) => {
    this.setState({ page: page })
    this.fetchMovies(this.state.searchName, page)
  }

  componentDidMount() {
    this.fetchMovies('', this.state.page)
  }

  componentWillUnmount() {
    this.fetchMoviesDebounced.cancel()
  }

  genresFilter(ids, genres) {
    return genres.filter((obj) => ids.includes(obj.id))
  }

  render() {
    const { movies, loading, error, searchName, page, total } = this.state
    const { guestSessionId } = this.props
    const genres = this.context

    const elements = movies.map((movie) => (
      <ItemList
        key={movie.id}
        movie={movie}
        title={movie.original_title}
        realeaseDate={movie.release_date}
        description={movie.overview}
        guestSessionId={guestSessionId}
        filteredGenres={this.genresFilter(movie.genre_ids, genres)}
      />
    ))
    return (
      <>
        <ul className={cl.wrapList}>
          <SearchForm searchName={searchName} onChange={(e) => this.handleSearchChange(e)} />
          {error ? <Error /> : false}
          {!loading ? elements : <Loader />}
        </ul>
        {!loading && movies.length && Number(total) / 20 > 1 ? (
          <Pagination
            style={{ marginBottom: '20px', justifySelf: 'center' }}
            current={page}
            onChange={this.pageChange}
            total={total}
            pageSize={20}
            showSizeChanger={false}
          />
        ) : !loading && !movies.length && !error ? (
          <Message />
        ) : (
          false
        )}
      </>
    )
  }
}
