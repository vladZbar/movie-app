import { Offline, Online } from 'react-detect-offline'
import { useEffect, useState } from 'react'
import './App.css'
import './reset.css'
import { Tabs } from 'antd'
import Error from '../UI/Error'
import MovieList from '../MovieList/MovieList'
import MoviesService from '../../API/MoviesServise'
import MovieRated from '../MovieRated/MovieRated'
import { AppProvider } from './AppContext'

const App = () => {
  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]

  const [guestSessionId, setGuestSessionId] = useState(null)
  const [page, setPage] = useState('1')
  const moviesService = new MoviesService()

  const onChange = (key) => {
    setPage(key)
  }

  useEffect(() => {
    const savedSessionId = localStorage.getItem('guestSessionId')

    if (savedSessionId) {
      setGuestSessionId(savedSessionId)
    } else {
      const getGuestSession = async () => {
        const sessionData = await moviesService.createGuestSession()
        setGuestSessionId(sessionData.guest_session_id)
        localStorage.setItem('guestSessionId', sessionData.guest_session_id)
      }
      getGuestSession()
    }
  }, [moviesService])

  useEffect(() => {
    if (page === '2' && guestSessionId) {
      moviesService.getRated(guestSessionId)
    }
  }, [page, guestSessionId, moviesService])


  return (
    <div>
      <AppProvider>
        <Online>
          <Tabs style={{ justifySelf: 'center' }} defaultActiveKey="1" items={items} onChange={onChange} />
          {page === '1' ? (
            <MovieList guestSessionId={guestSessionId} />
          ) : (
            <MovieRated guestSessionId={guestSessionId} />
          )}
        </Online>
        <Offline>
          <div style={{ paddingTop: '40px' }}>
            <Error />
          </div>
        </Offline>
      </AppProvider>
    </div>
  )
}

export default App
