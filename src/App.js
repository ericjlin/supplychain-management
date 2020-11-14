import './App.css';
import React from 'react';
import LoggedInRoutes from './LoggedInRoutes.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Sensors from './Sensors.jsx';


class App extends React.Component {
  isLoggedIn() {
    return localStorage.getItem("user") != null;
  }

  checkRoles() {
    if (localStorage.getItem("user") == "support") {
      return "support";
    } else if (localStorage.getItem("user") == "manager") {
      return "manager";
    } else {
      return "supplier";
    }
  }

  render() {
    let history = createBrowserHistory();
    return (
      <Router forceRefresh={true} history={history}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
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
