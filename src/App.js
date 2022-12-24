import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Trending from './pages/Trending/Trending'
import Movies from './pages/Movies/Movies'
import Series from './pages/Series/Series'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './pages/Search/SearchBar';
import Favourites from './pages/Favourites/Favourites';

function App() {

  localStorage.setItem('favs', JSON.stringify([]));
  
  return (
      <BrowserRouter>
        <Header />
        <div className="App">
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='/trending' exact element={<Trending />} />
              <Route path='/movies' exact element={<Movies />} />
              <Route path='/series' exact element={<Series />} />
              <Route path='/search' exact element={<SearchBar />} />
              <Route path='/favourite' exact element={<Favourites />} />
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
