import { React, useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { filterMovies, filterShortMovies } from '../../utils/utils';

import './App.css';

function App() {
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [initialMovies, setInititalMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [isRegisterPageLoading, setIsRegisterPageLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInititalMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    moviesList.length === 0 ? setNoResults(true) : setNoResults(false);
    setInititalMovies(moviesList);
    setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function handleSearchMovieSubmit(inputValue) {
    setAreMoviesLoading(true);
    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', shortMovies);

    moviesApi
      .getMovies()
      .then((data) => {
        handleSetFilteredMovies(data, inputValue, shortMovies);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setAreMoviesLoading(false));
  }

  function toggleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  function handleMovieSave(movie) {
    mainApi
      .postMovie(movie)
      .then((newMovie) => {
        setSavedMoviesList([newMovie, ...savedMoviesList]);
      })
      .catch((err) => console.log(err));
  }

  function handleMovieDelete(movie) {
    const savedMovie = savedMoviesList.find((m) => {
      if (m.movieId === movie.id || m.movieId === movie.movieId) {
        return m;
      } else {
        return savedMoviesList;
      }
    });
    mainApi
      .deleteMovie(savedMovie._id)
      .then((res) => {
        const newMoviesList = savedMoviesList.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch((err) => console.log(err));
  }

  function handleRegister({ name, email, password }) {
    setIsRegisterPageLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        setRegisterErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsRegisterPageLoading(false);
      });
  }

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Header logged={false} />
          <Main />
          <Footer />
        </Route>
        <Route path='/movies'>
          <Header logged={true} />
          <Movies
            isLoading={areMoviesLoading}
            isError={isError}
            noResults={noResults}
            handleSearchSubmit={handleSearchMovieSubmit}
            toggleShortFilms={toggleShortFilms}
            shortMovies={shortMovies}
            moviesList={filteredMovies}
            handleMovieSave={handleMovieSave}
            handleMovieDelete={handleMovieDelete}
            savedMoviesList={savedMoviesList}
            savedMoviesPage={false}
          />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header logged={true} />
          <SavedMovies handleMovieDelete={handleMovieDelete} savedMoviesList={savedMoviesList} />
          <Footer />
        </Route>
        <Route path='/profile'>
          <Header logged={true} />
          <Profile />
        </Route>
        <Route path='/signup'>
          <Register
            handleRegister={handleRegister}
            errorMessage={registerErrorMessage}
            isLoading={isRegisterPageLoading}
          />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
