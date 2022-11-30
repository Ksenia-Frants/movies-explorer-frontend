import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
// import Register from '../Register';
// import Login from '../Login';

import './App.css';

function App() {
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
          <Movies />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header logged={true} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path='/profile'>
          <Header logged={true} />
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
