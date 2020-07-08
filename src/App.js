import React from "react";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Education from "./features/education/Education";
import NewEducation from "./features/education/newEducation";
import Excercise from "./features/excercise/Excercise";
import NewQuestion from "./features/excercise/newQuestion";
import NewInteractiveQuestion from "./features/excercise/newInteractiveQuestion";
import ResponsiveNavbar from "./layout/ResponsiveNavbar";
import useAuthUser from "./hooks/useAuthUser";
import Account from "./features/auth/Account";
import Home from "./pages/Home";
import ChangeModul from "./pages/ChangeModul";
import "./App.css";

function App() {
  const currentUser = useAuthUser();
  const navLinks = [
    {
      text: "Transport",
      icon: "flight",
    },
    {
      text: "Body",
      icon: "emoji_people",
    },
    {
      text: "Food",
      icon: "fastfood",
    },
  ];
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
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <React.Fragment>
      <Router>
        <ResponsiveNavbar
          navLinks={navLinks}
          background="#333333"
          hoverBackground="rgba(219, 112, 147,0.2)"
          linkColor="palevioletred"
        ></ResponsiveNavbar>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login">
              {currentUser ? <Redirect to={{ pathname: "/" }} /> : <Login />}
            </Route>
            <Route path="/register">
              {currentUser ? <Redirect to={{ pathname: "/" }} /> : <Register />}
            </Route>
            <Route path="/createEducation" component={NewEducation}></Route>
            <Route path="/createQuestion" component={NewQuestion}></Route>
            <Route
              path="/createInteractiveQuestion"
              component={NewInteractiveQuestion}
            ></Route>
            <PrivateRoute path="/account">
              <Account />
            </PrivateRoute>
            <Route exact path="/excercise/">
              {" "}
              <ChangeModul navLinks={navLinks} type="excercise" />{" "}
            </Route>
            <Route exact path="/education/">
              {" "}
              <ChangeModul navLinks={navLinks} type="education" />{" "}
            </Route>
            <Route path="/excercise/:modul" component={Excercise}></Route>
            <Route path="/education/:modul" component={Education}></Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}
export default App;
