import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Counter from './features/counter/Counter'
import Education from './features/education/Education';
import Excercise from './features/excercise/Excercise';
import ResponsiveNavbar from './layout/ResponsiveNavbar';

import './App.css';

function App() {

  const navLinks = [
  {
    text:"Transport",
    icon:"flight"
  },
  {
    text:"Parts of the body",
    icon:"emoji_people"
  },
  {
    text:"Food",
    icon:"fastfood"
  }
]
  return (
    <React.Fragment>
      <ResponsiveNavbar 
      navLinks = {navLinks}
      background = '#333333'
      hoverBackground = '#888'
      linkColor = 'palevioletred'
      ></ResponsiveNavbar>
      <div className = "App">
      <Router basename={`${process.env.PUBLIC_URL}/`}>
        <Switch>
        <Route exact path = "/" component = {Education}></Route>
        <Route path = "/excercise/" component = {Excercise}></Route>
      </Switch>
    </Router>      
      </div>
    </React.Fragment>
    
  );
}

export default App;
