import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoggedInRoutes from './LoggedInRoutes.jsx';
import Login from './Login.jsx';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  isLoggedIn() {

    return localStorage.getItem("manager") != null
    || localStorage.getItem("user") != null
    || localStorage.getItem("support") != null;
  }

  render() {
    let history = createBrowserHistory();
    return (
      <Router forceRefresh={true} history={history}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/"
                    render={props => {
                        if (this.isLoggedIn()) {
                            return <LoggedInRoutes {...props} />;
                        } else {
                            return <Redirect to="/login"/>;
                        }
                    }} />
        </Switch>
      </Router>
    );
  }
}

export default App;
