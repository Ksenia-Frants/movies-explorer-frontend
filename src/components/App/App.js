import { React, useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { remakeMovieData } from '../../utils/utils';

import './App.css';

function App() {
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [initialMovies, setInititalMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState({});
  const [loginErrorMessage, setLoginErrorMessage] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const footerEndpoints = ['/movies', '/saved-movies', '/'];

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

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi
        .getUser()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

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

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMoviesList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setIsPageLoading(true);
      mainApi
        .getUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsPageLoading(false);
        });
    }
  }, [loggedIn]);

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
        handleSetFilteredMovies(remakeMovieData(data), inputValue, shortMovies);
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
    setIsPageLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegisterErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsPageLoading(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        setLoginErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }

  function handleSignOut() {
    setCurrentUser({});
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  function handleEditProfile(newProfile) {
    setIsPageLoading(true);
    mainApi
      .updateUser(newProfile)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
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
            savedMoviesPage={false}>
            <Movies />
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            handleMovieDelete={handleMovieDelete}
            savedMoviesList={savedMoviesList}
            loggedIn={loggedIn}></ProtectedRoute>

          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            handleSignOut={handleSignOut}
            user={currentUser}
            handleEditProfile={handleEditProfile}></ProtectedRoute>

          <Route path='/signup'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Register
                handleRegister={handleRegister}
                errorMessage={registerErrorMessage}
                isLoading={isPageLoading}
              />
            )}
          </Route>
          <Route path='/signin'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Login
                handleLogin={handleLogin}
                isLoading={isPageLoading}
                errorMessage={loginErrorMessage}
              />
            )}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
