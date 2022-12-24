import { Container } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainNav from '../../components/MainNav/MainNav'
import MovieCard from '../../components/MovieCard/MovieCard'
import CustomPagination from '../../components/Pagination/CustomPagination'
import CardSkeleton from '../../components/CardSkeleton/CardSkeleton'
import './Trending.css'

const Trending = () => {

  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [numOfPages, setnumOfPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchTrending = async () => {
    setIsLoading(true)
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    setContent(data.results);
    setnumOfPages(data.total_results)
    if(data.total_results > 500){
      setnumOfPages(500)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page])


  return (
    <div>
      <div>
        <Container>
          <span className='page-title'>Trending</span>
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
                    media_type= {c.media_type}
                    rating={c.vote_average}
                    isFavourite = {false}
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
    </div>
  )
}

export default Trending