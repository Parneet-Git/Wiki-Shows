import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './ContentModal.css'
import axios from 'axios';
import Carousel from '../Carousel/Carousel';
import { unavailableLandscape } from '../config/config';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '80%',
        height: '80%',
        border: '2px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

const ContentModal = ({ children, media_type, id }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
        
        setContent(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        
        setVideo(data.results[1]?.key);
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div onClick={handleOpen} className='movie-card'>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content &&
                        (
                            <div className={`${classes.paper} modal-container`}>
                                
                                <iframe key={video} width='98%' height='80%' src={video?`https://www.youtube.com/embed/${video}`:unavailableLandscape} title='hello'></iframe>
                                <div className="modal-info">
                                    <div className="modal-title">
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            '-----'
                                        ).substring(0, 4)}
                                        )
                                        <div className="fav">
                                            
                                        </div>
                                    </div>
                                    <div className="modal-desc">
                                        {content.overview}
                                    </div>
                                    <Carousel media_type={media_type} id={id} />
                                </div>
                            </div>
                        )
                    }
                </Fade>
            </Modal>
        </>
    );
}

export default ContentModal