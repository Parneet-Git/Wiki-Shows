import { useEffect, useState } from 'react'
import { Button, Container, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import MainNav from '../../components/MainNav/MainNav';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import MovieCard from '../../components/MovieCard/MovieCard'
import CardSkeleton from '../../components/CardSkeleton/CardSkeleton';
import './Search.css'

const SearchBar = () => {
    const [page, setPage] = useState(1)
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState('')
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff'
            }
        }
    })

    const fetchSearch = async () => {
        if(searchText === ''){
            return
        }
        setIsLoading(true)
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            if(data.results.length === 0){
                setNumOfPages(0);
                setContent('');
            }
            else{
                setContent(data.results);
                setNumOfPages(data.total_pages);
            }
        } catch (error) { }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchSearch();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [type, page])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Container>
                    <div className='search-container'>
                        <TextField
                            style={{ flex: 1 }}
                            className='search-box'
                            label='Search'
                            variant='filled'
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    fetchSearch()
                                }
                            }}
                        />
                        <Button variant='contained' style={{ marginLeft: '10px' }} onClick={fetchSearch}><Search /></Button>
                    </div>
                    <Tabs
                        value={type}
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={(event, newValue) => {
                            setType(newValue);
                            setPage(1);
                        }}>
                        <Tab label='Search Movies' style={{ width: "50%" }} />
                        <Tab label='Search Tv Series' style={{ width: "50%" }} />
                    </Tabs>
                </Container>
                <MainNav />
            </ThemeProvider>
            <div className="trending" style={{ marginTop: '1rem' }}>
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
                        content &&
                            content.map((c) => (
                                <MovieCard
                                    key={c.id}
                                    id={c.id}
                                    poster={c.poster_path}
                                    title={c.title || c.name}
                                    date={c.first_air_date || c.release_date}
                                    media_type={type ? "tv" : "movie"}
                                    rating={c.vote_average}
                                    isFavourite = {false}
                                />
                            ))
                    }
                {
                    searchText &&
                    (content === '') &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default SearchBar