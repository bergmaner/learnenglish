import React from 'react';
import Education, { Counter } from './features/education/Education';
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
      <ResponsiveNavbar navLinks = {navLinks}></ResponsiveNavbar>
      <Education/>
    </React.Fragment>
    
  );
}

export default App;
