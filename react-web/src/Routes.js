import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Weekly from './components/Weekly/Weekly';
import Current from './components/Current/Current';
import Hourly from './components/Hourly/Hourly';
import Minutely from './components/Minutely/Minutely';
import Home from './components/Home/Home'
// import Month from './components/Month/Month';

export default ({ childProps }) =>
  <Switch id='page'>
    <Route path='/' exact component={Home} props={childProps} />
    <Route path='/week' exact component={Weekly} props={childProps} />
    <Route path='/hour' exact component={Hourly} props={childProps} />
    <Route path='/current' exact component={Current} props={childProps} />
    <Route path='/minute' exact component={Minutely} props={childProps} />
  </Switch>