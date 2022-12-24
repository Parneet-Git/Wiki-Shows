import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from '@material-ui/core'
import MovieCard from '../../components/MovieCard/MovieCard'
import MainNav from '../../components/MainNav/MainNav'
import CardSkeleton from '../../components/CardSkeleton/CardSkeleton'
import './Favourites.css'

const Favourites = () => {

    const [content, setContent] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchMovie = async() => {
        setIsLoading(true)
        const fav_arr = JSON.parse(localStorage.getItem('favs'));
        for (let fav of fav_arr) {
            await fetchMovies(fav.media_type, fav.id);
        }
        setIsLoading(false);
    }

    const fetchMovies = async (media_type, id) => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
            )
        data.media_type = media_type
        setContent((oldContent) => {
            return [...oldContent, data];
        })
    }

    useEffect(() => {
        fetchMovie();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Container>
                <span className='page-title'>Favourites</span>
                <div className="trending favourites">
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
                                    media_type={c.media_type}
                                    rating={c.vote_average}
                                    isFavourite = {true}
                                />
                            ))
                    }
                </div>
            </Container>
            <MainNav />
        </div>
    )
}

export default Favourites
