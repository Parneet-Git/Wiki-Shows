const useGenre = (selectedGenres) =>{
    if(selectedGenres.length < 1){
        return ''
    }
    else{
        const GenreIds = selectedGenres.map((g)=>g.id);
        return GenreIds.reduce((old, curr) => old+','+curr)
    }
}

export default useGenre