import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './search';
import Overview from './overview';

class App extends Component {
  render(){
    return (
        <Router>
          <Switch>
              <Route path='/' component={Search}/>
              <Route path='/overview' component={Overview}/>
          </Switch>
        </Router>
    );
  }
  
}

export default App;
