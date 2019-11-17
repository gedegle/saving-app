import React, {Component} from 'react';

import{ BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './sign-up-viewport.css';
import './style-viewport.css';

import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";
import NewPlan from "./pages/NewPlan";
import History from "./pages/History";
import Register from "./pages/Register";
import Login from "./pages/Login";

class App extends Component {
  render(){
    return (
        <Router>
          <Switch>
            <Route exact path={"/home"} component={Dashboard} />
            <Route exact path={"/archive"} component={Archive} />
            <Route exact path={"/new-plan"} component={NewPlan} />
            <Route exact path={"/history"} component={History} />
            <Route exact path={"/signup"} component={Register} />
            <Route exact path={"/login"} component={Login} />
          </Switch>
        </Router>
    )
  }
}

export default App;
