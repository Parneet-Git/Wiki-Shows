import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Favorite, Movie, Tv, Whatshot } from '@material-ui/icons';
import './MainNav.css'
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100vw',
        position:'fixed',
        bottom: 0,
        backgroundColor: '#1b1b1b',
        zIndex: 10
    },
});

const MainNav = () => {
    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = useState(-1);
    if(value !== -1 && location.pathname === '/'){
        setValue(-1);
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(value === 0){
            navigate('/trending')
        }
        else if(value === 1){
            navigate('/movies')
        }
        else if(value === 2){
            navigate('/series')
        }
        else if(value === 3){
            navigate('/favourite')
        }
    }, [value, navigate])

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Trending" icon={<Whatshot />} onClick={scrollToTop}/>
            <BottomNavigationAction label="Movies" icon={<Movie />} onClick={scrollToTop}/>
            <BottomNavigationAction label="Tv Shows" icon={<Tv />} onClick={scrollToTop} />
            <BottomNavigationAction label="Favourite" icon={<Favorite />} onClick={scrollToTop} />
        </BottomNavigation>
    );
}

export default MainNav