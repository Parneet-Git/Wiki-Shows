import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import './Genre.css'

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {
    const handleAdd = (obj) => {
        const genre = JSON.parse(obj);
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(data.genres);
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className="genre-container">
            <span className="genres-container">
                <select name="genres" id="genres" onChange={(e) => handleAdd(e.target.value)}>
                    <option value=''>Filter</option>
                    {  
                    genres && 
                    genres.map((genre) => (
                        <option
                            value={JSON.stringify(genre)}
                            key={genre.id}
                        >{genre.name}</option>
                        ))
                    }
                </select>
            </span>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
        </div>
    );
};

export default Genres