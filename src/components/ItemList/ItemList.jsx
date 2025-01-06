import { Component } from 'react'
import { Rate, Typography } from 'antd'
import { Button } from 'antd'
const { Text, Title } = Typography
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import MoviesService from '../../API/MoviesServise'

import cl from './ItemList.module.css'
import { values } from 'lodash'

export default class ItemList extends Component {
  state = {
    raiting: Number(localStorage.getItem(this.props.movie.id)) || 0,
  }

  moviesService = new MoviesService()

  handleRaitingChange = (value) => {
    localStorage.setItem(this.props.movie.id, value)
    this.setState({ raiting: Number(localStorage.getItem(this.props.movie.id)) })
    this.moviesService.addRating(this.props.movie.id, value, this.props.guestSessionId)
  }

  render() {
    function formatDesc(desc, title, genres) {
      const arr = desc.split(' ')
      const titleAtt = title.split(' ')

      let result = ''

      if (window.innerWidth < 1120) {
        result =
          arr
            .slice(0, 35)
            .join(' ')
            .replace(/[,.!?]$/, '') + '...'
        return result
      }

      if (titleAtt.length > 4) {
        result =
          arr
            .slice(0, 15)
            .join(' ')
            .replace(/[,.!?]$/, '') + '...'
        return result
      }

      if (genres.length >= 4) {
        result =
          arr
            .slice(0, 20)
            .join(' ')
            .replace(/[,.!?]$/, '') + '...'
        return result
      }

      result =
        arr
          .slice(0, 25)
          .join(' ')
          .replace(/[,.!?]$/, '') + '...'
      return result
    }

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

    const { movie, title, realeaseDate, description, filteredGenres } = this.props
    const { raiting } = this.state
    const genresElements = filteredGenres.map((genre) => (
      <Button key={genre.id} className={cl.genreBtn} color="default" variant="solid">
        {genre.name}
      </Button>
    ))

    return (
      <li className={cl.item}>
        <div className={cl.contentWrap}>
          <img className={cl.imgCard} src={`${imageBaseUrl}${movie.poster_path}`} alt={title} />
          <div className={cl.content}>
            <div className={cl.headerItem}>
              <div className={cl.titleWrap}>
                <img className={cl.imgCard__mob} src={`${imageBaseUrl}${movie.poster_path}`} alt={title} />
                <Title className={cl.title} level={3} style={{ margin: 0, paddingRight: '35px', paddingBottom: '7px' }}>
                  {title}
                </Title>
                <div
                  className={cl.raiting}
                  style={{
                    border: `2px solid 
                  ${
                    raiting < 3
                      ? '#e90000'
                      : raiting > 3 && raiting < 5
                        ? '#e97E00'
                        : raiting > 5 && raiting < 7
                          ? '#e9D100'
                          : '#66E900'
                  }`,
                  }}
                >
                  <Text>{raiting}</Text>
                </div>
              </div>
              <Text style={{ marginBottom: '7px' }} type="secondary">
                {realeaseDate
                  ? format(new Date(realeaseDate), 'MMMM dd, yyyy', {
                      locale: enGB,
                    })
                  : false}
              </Text>
              <div className={cl.genresWrap}>{genresElements}</div>
            </div>
            <Text style={{ marginBottom: 'auto' }}>{formatDesc(description, title, filteredGenres)}</Text>
            <Rate className={cl.mobRate} onChange={this.handleRaitingChange} value={raiting} allowHalf count={10} />
          </div>
        </div>
      </li>
    )
  }
}
