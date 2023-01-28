import { React } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import moviesApi from '../../utils/MoviesApi';
// import { filterMovies, filterShortMovies } from '../../utils/utils';

function Movies() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [shortMovies, setShortMovies] = useState(false);
  // const [notFound, setNotFound] = useState(false);
  // const [filteredMovies, setFilteredMovies] = useState([]);

  // function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
  //   const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
  //   moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
  //   setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
  //   localStorage.setItem('movies', JSON.stringify(moviesList));
  // }

  // function handleSearchSubmit(inputValue) {
  //   setIsLoading(true);
  //   localStorage.setItem('movieSearch', inputValue);
  //   localStorage.setItem('shortMovies', shortMovies);

  //   moviesApi
  //     .getMovies()
  //     .then((data) => {
  //       handleSetFilteredMovies(data, inputValue, shortMovies);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setIsLoading(false));
  // }

  // function handleShortFilms() {
  //   setShortMovies(!shortMovies);
  //   localStorage.setItem('shortMovies', !shortMovies);
  // }

  // useEffect(() => {
  //   if (localStorage.getItem('shortMovies') === 'true') {
  //     setShortMovies(true);
  //   } else {
  //     setShortMovies(false);
  //   }
  // }, []);

  return (
    <main className='content'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
