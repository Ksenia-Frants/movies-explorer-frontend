import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Register from '../Register';
// import Login from '../Login';
// import Movies from '../Movies';
// import SavedMovies from '../SavedMovies';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
      </Switch>
      <Footer />
      <Route path='/movies'></Route>
    </div>
  );
}

export default App;
