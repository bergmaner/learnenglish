import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Counter from './features/counter/Counter';
import Login from './features/auth/Login';
import Education from './features/education/Education';
import Excercise from './features/excercise/Excercise';
import ResponsiveNavbar from './layout/ResponsiveNavbar';
import useAuthUser from './hooks/useAuthUser';
import Account from './features/auth/Account';
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
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


const currentUser = useAuthUser();
console.log(currentUser);
  return (
    <React.Fragment>
       <Router basename={`${process.env.PUBLIC_URL}/`}>
       
      <ResponsiveNavbar 
      navLinks = {navLinks}
      background = '#333333'
      hoverBackground = '#888'
      linkColor = 'palevioletred'
      ></ResponsiveNavbar>
      <div className = "App">
      <Switch>
        <Route exact path = "/" component = {Education}></Route>
        <Route path = "/login" component = {Login}></Route>
        <PrivateRoute path = "/account"><Account/></PrivateRoute>
        <Route path = "/excercise/" component = {Excercise}></Route>
      </Switch>
      </div>
    </Router>      
     
    </React.Fragment>
    
  );
}

export default App;
