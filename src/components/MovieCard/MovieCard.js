import { Badge } from '@material-ui/core'
import { Favorite } from '@material-ui/icons'
import React from 'react'
import { img_300, unavailable } from '../config/config'
import ContentModal from '../ContentModal/ContentModal'
import './MovieCard.css'

const Card = (props) => {

  const { id, poster, title, date, media_type, rating, isFavourite } = props

  const addFav = (e, media_type, id) => {
    e.stopPropagation();
    const favs_arr = JSON.parse(localStorage.getItem('favs'));
    const index = favs_arr.findIndex((c) => c.id === id);
    if (index === -1) {
      favs_arr.push({ media_type, id });
      localStorage.setItem('favs', JSON.stringify(favs_arr));
    }
    else if (isFavourite){
      e.target.parentElement.parentElement.parentElement.remove();
      favs_arr.splice(index, 1);
      localStorage.setItem('favs', JSON.stringify(favs_arr));
    }
  }

  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge overlap='rectangular' badgeContent={Math.round(rating * 100) / 100} color={rating > 6 ? 'secondary' : 'primary'} />
        <div className='favorite-btn'>
          <Favorite onClick={(e) => addFav(e, media_type, id)}/>
        </div>
      <div className="poster-container">
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt="" />
      </div>
      <div className="card-info">
        <b className="title">{title}</b>
        <span className='subtitle'>
          <span>{media_type === 'tv' ? "TV Series" : "Movie"}</span>
          <span>{date}</span>
        </span>
      </div>
    </ContentModal>
  )
}

export default Card
