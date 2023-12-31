import './App.css'
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path = '/'>
            <Home/>
          </Route>
          <Route path = '/search'>
            <Search/>
          </Route>
          <Route path = '/create'>
            <Create/>
          </Route>
          <Route path = '/recipes/:id'>
            <Recipe/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
