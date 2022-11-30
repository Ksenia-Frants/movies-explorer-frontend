import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
// import Register from '../Register';
// import Login from '../Login';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
      </Switch>
      <Footer />
      <Route path='/movies'></Route>
    </div>
  );
}

export default App;
