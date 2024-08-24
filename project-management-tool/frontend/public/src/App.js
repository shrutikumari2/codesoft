import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectPage from './components/ProjectPage';
import TaskPage from './components/TaskPage';
import Login from './components/Login';
import Register from './components/Register';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/projects/:id" exact component={ProjectPage} />
      <Route path="/projects/:id/add-task" component={TaskPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

export default App;
