import React from 'react'
import { Button } from '@material-ui/core'
import { Search, Favorite, PlaylistAddCheck, Facebook, Instagram, LinkedIn, Twitter } from '@material-ui/icons'
import './Home.css'
import { Link } from 'react-router-dom'


const Home = () => {

  window.addEventListener('scroll', () => {
    let sections = document.getElementsByTagName('section');
    for (let section of sections) {
      let sectionTop = section.getBoundingClientRect().top
      let sectionBottom = section.getBoundingClientRect().bottom
      let windowHeight = window.innerHeight
      if (sectionTop < windowHeight - 100 && sectionBottom > 300) {
        document.body.style.background = section.getAttribute('data-background')
        section.classList.add('active')
      }
      else{
        if(sectionBottom < 200){
          section.classList.add('active-greater')
        }
        else{
          section.classList.remove('active-greater')
          section.classList.remove('active')
        }
      }
    }
  })

    return (
    <div>
      <div className="home-container">
        <section className="intro-section active" data-background="">
            <div className="intro-container">
                <div className="intro-text-container">
                    <div className="intro-text">
                      <div className="heading">
                        Wiki Shows
                      </div>
                      <div className="intro-sub-text">Latest or Old, search any show in an instant. This is a perfect place to find movies, tv shows, documentaries and keeping them in your wish list or favourites.
                      </div>
                    </div>
                </div>
                <Link to='/trending'>
                  <Button className='button'><span className='button-text'>Explore Shows</span></Button>
                </Link>
            </div>
        </section>
        <section className="categories-section" data-background="">
          <div className="categories-container">
            <div className="heading-box">
              <div className="heading heading1">
                Explore<br/>from
              </div>
              <div className="heading heading2">
                Various <br/> Categories
              </div>
            </div>
            <div className="category-cloud-container">
              <div className="category-cloud">
                <span data-weight="3">Romantic</span>
                <span data-weight="6">Crime</span>
                <span data-weight="1">Documentary</span>
                <span data-weight="4">Action</span>
                <span data-weight="2">Fantasy</span>
                <span data-weight="3">Cartoon</span>
                <span data-weight="2">Historical</span>
                <span data-weight="6">Horror</span>
                <span data-weight="3">Drama</span>
                <span data-weight="2">Sports</span>
                <span data-weight="5">Sci-fi</span>
                <span data-weight="1">Political</span>
                <span data-weight="3">Music show</span>
                <span data-weight="1">Reality show</span>
                <span data-weight="4">Game show</span>
              </div>
            </div>
          </div>
        </section>
        <section className="features-section" data-background="rgb(3, 53, 97)">
          <div className="features-container">
            <div className="heading">
              Features you ever wanted
            </div>
            <div className="feature-cards">
              <div className="feature-card">
                <i className="feature-icon-container">
                  <Search className='feature-icon' />
                </i>
                <div className="card-text">
                  <div className="card-heading">
                    Xplore
                  </div>
                  <div className="card-sub-text">
                    With search bar quickly find your favourite TV shows, web series, and other content.
                  </div>
                </div>
              </div>
              <div className="feature-card">
                <i className="feature-icon">
                  <Favorite className='feature-icon' />
                </i>
                <div className="card-text">
                  <div className="card-heading">
                    Favourites
                  </div>
                  <div className="card-sub-text">
                    Favourites allows you to keep a record of your favourite shows together in separate space.
                  </div>
                </div>
              </div>
              <div className="feature-card">
                <i className="feature-icon">
                  <PlaylistAddCheck className='feature-icon' />
                </i>
                <div className="card-text">
                  <div className="card-heading">
                    Filter Categories
                  </div>
                  <div className="card-sub-text">
                    Sort your results from movies and tv shows and search for your favourite shows more easily
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="footer-container">
            <div className="social-icons">
              <Facebook />
              <Instagram />
              <Twitter />
              <LinkedIn />
            </div>
            <div className="footer-title">
              Wiki Shows by @ParneetSingh
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home