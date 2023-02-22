import { SHORTFILM_DURATION } from './constants';

export function filterShortMovies(movies) {
  return movies.filter((movie) => movie.duration < SHORTFILM_DURATION);
}

export function filterMovies(movies, userQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

export function remakeMovieData(movies) {
  movies.forEach((movie) => {
    if (!movie.image) {
      movie.image = 'https://portal-kultura.ru/upload/iblock/773/cinema-geabd9454f_1920.jpg';
      movie.thumbnail = 'https://portal-kultura.ru/upload/iblock/773/cinema-geabd9454f_1920.jpg';
    } else {
      movie.thumbnail = `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co/${movie.image.url}`;
    }
  });
  return movies;
}
