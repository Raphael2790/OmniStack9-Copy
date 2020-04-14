import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login/index';
import New from './pages/New/index';
import Dashboard from './pages/Dashboard/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/new" component={New}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  )
}