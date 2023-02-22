import { React, useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect, useLocation } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [updatedSavedMovieList, setUpdatedSavedMovieList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState({});
  const [loginErrorMessage, setLoginErrorMessage] = useState({});
  const [profileErrorMessage, setProfileErrorMessage] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isDisabledFormElement, setIsDisabledFormElement] = useState(false);

  const footerEndpoints = ['/movies', '/saved-movies', '/'];

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const pathname = location.pathname;

    if (token) {
      mainApi
        .getUser(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push(pathname);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (loggedIn && token) {
      setIsPageLoading(true);
      mainApi
        .getUser(token)
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

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getMovies()
        .then((res) => {
          setSavedMoviesList(res.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, updatedSavedMovieList]);

  function handleMovieSave(movie) {
    const isSavedMovie = savedMoviesList.some((userMovie) => userMovie.movieId === movie.movieId);

    isSavedMovie
      ? handleMovieDelete(movie)
      : mainApi
          .postMovie(movie)
          .then((newMovie) => setSavedMoviesList([...savedMoviesList, newMovie]))
          .catch((err) => console.log(err));
  }

  function handleMovieDelete(movie) {
    const savedUserMovie = savedMoviesList.find(
      (userMovie) => userMovie.movieId === movie.id || userMovie.movieId === movie.movieId,
    );
    mainApi
      .deleteMovie(savedUserMovie._id)
      .then(() => {
        const newSavedMovieList = savedMoviesList.filter(
          (userMovie) => userMovie.movieId !== movie.movieId,
        );
        setSavedMoviesList(newSavedMovieList);
        setUpdatedSavedMovieList(savedMoviesList);
      })
      .catch((err) => console.log(err));
  }

  function handleRegister({ name, email, password }) {
    setIsPageLoading(true);
    setIsDisabledFormElement(true);
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
        setIsDisabledFormElement(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsPageLoading(true);
    setIsDisabledFormElement(true);
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
        setIsDisabledFormElement(false);
      });
  }

  function handleSignOut() {
    setCurrentUser({});
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  function handleEditProfile(newProfile, setIsNotifyVisible) {
    setIsPageLoading(true);
    mainApi
      .updateUser(newProfile)
      .then((res) => {
        setCurrentUser(res);
        setIsNotifyVisible(true);
        setInterval(() => {
          setIsNotifyVisible(false);
        }, 3000);
      })
      .catch((err) => {
        setProfileErrorMessage(err);
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
            handleEditProfile={handleEditProfile}
            errorMessage={profileErrorMessage}></ProtectedRoute>

          <Route path='/signup'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Register
                handleRegister={handleRegister}
                errorMessage={registerErrorMessage}
                isLoading={isPageLoading}
                isDisabledFormElement={isDisabledFormElement}
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
                isDisabledFormElement={isDisabledFormElement}
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
