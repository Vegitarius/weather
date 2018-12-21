import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Weekly from './components/Weekly/Weekly';
import Current from './components/Current/Current';
// import Month from './components/Month/Month';

export default ({ childProps }) =>
  <Switch id='page'>
    <Route path='/' exact component={Current} props={childProps} />
    <Route path='/week' exact component={Weekly} props={childProps} />
    <Route path='/hour' exact component={Weekly} props={childProps} />
    <Route path='/current' exact component={Current} props={childProps} />
    <Route path='/minute' exact component={Weekly} props={childProps} />
  </Switch>