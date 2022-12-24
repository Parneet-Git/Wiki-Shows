import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from '@material-ui/core'
import MovieCard from '../../components/MovieCard/MovieCard'
import CustomPagination from '../../components/Pagination/CustomPagination'
import MainNav from '../../components/MainNav/MainNav'
import Genre from '../../components/Genre/Genre'
import useGenre from '../../hooks/useGenre'
import CardSkeleton from '../../components/CardSkeleton/CardSkeleton'

const Series = () => {

  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const genresAsId = useGenre(selectedGenres)
  const [isLoading, setIsLoading] = useState(true)

  const fetchMovies = async () => {
    setIsLoading(true)
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresAsId}`)
    setContent(data.results)
    setNumOfPages(data.total_pages)
    if (data.total_pages > 500) {
      setNumOfPages(500)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genresAsId])

  return (
    <div>
      <Container>
        <span className='page-title'>TV Series</span>
        <Genre type='tv' selectedGenres={selectedGenres} genres={genres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
        <div className="trending">
          {
            isLoading ?
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
              :
            content && content.map((c) => (
              <MovieCard
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_data || c.release_date}
                media_type='tv'
                rating={c.vote_average}
              />
            ))
          }
        </div>
        {
          numOfPages > 1 &&
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        }
      </Container>
      <MainNav />
    </div>
  )
}

export default Series
