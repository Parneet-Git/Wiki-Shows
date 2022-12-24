import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
import { Search } from '@material-ui/icons';

const Header = () => {
    return (
        <div className="main-div">
            <div className='header-container'>
                <Link to='/'>
                    <span className='header-title' onClick={()=>window.scrollTo(0,0)}>Wiki Shows</span>
                </Link>
                <Link to='/search'>
                    <span><Search /></span>
                </Link>
            </div>
        </div>
    )
}

export default Header
