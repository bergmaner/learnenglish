import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Login from './features/auth/Login';
import Education from './features/education/Education';
import NewEducation from './features/education/newEducation';
import Excercise from './features/excercise/Excercise';
import NewQuestion from './features/excercise/newQuestion';
import NewInteractiveQuestion from './features/excercise/newInteractiveQuestion';
import ResponsiveNavbar from './layout/ResponsiveNavbar';
import useAuthUser from './hooks/useAuthUser';
import Account from './features/auth/Account';
import './App.css';

function App() {
  const currentUser = useAuthUser();
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
        )}
    />);}

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
        <Route exact path = "/"></Route>
        <Route path = "/login" component = {Login}></Route>
        {
          //3 Routy do rozbudowy bazy w przyszłości możliwe, że będzie panel Admina w którym będzie do nich dostęp tylko z poziomu administracji
        }
        
        <Route path = "/createEducation" component = {NewEducation}></Route>
        <Route path = "/createQuestion" component = {NewQuestion}></Route>
        <Route path = "/createInteractiveQuestion" component = {NewInteractiveQuestion}></Route>
        <PrivateRoute path = "/account"><Account/></PrivateRoute>
        <Route path = "/excercise/:modul" component = {Excercise}></Route>
        <Route path = "/education/:modul" component = {Education}></Route>
      </Switch>
      </div>
    </Router>
    </React.Fragment>
  );
}
export default App;