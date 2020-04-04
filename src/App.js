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
      <ResponsiveNavbar 
      navLinks = {navLinks}
      background = '#333333'
      hoverBackground = '#888'
      linkColor = 'palevioletred'
      ></ResponsiveNavbar>
      <div className = "App">
      <Education/>
      </div>
    </React.Fragment>
    
  );
}

export default App;
