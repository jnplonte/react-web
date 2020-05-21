import * as React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { RouteWithLayout, AuthenticatedRoute, UnAuthenticatedRoute } from '../components';
import { MainLayout, MinimalLayout } from '../layouts';

import {
    SignInView,
    DashboardView,
    NotFoundView,
    TodoListView,
    AccountView,
    UserView
} from '../views';

const Routes = () => {
  return (
    <Switch>
      <UnAuthenticatedRoute
        exact
        component={SignInView}
        layout={MinimalLayout}
        path='/'
      />
      <AuthenticatedRoute
        component={AccountView}
        layout={MainLayout}
        path='/account'
      />
      <AuthenticatedRoute
        component={DashboardView}
        layout={MainLayout}
        path='/dashboard'
      />
      <AuthenticatedRoute
        component={UserView}
        layout={MainLayout}
        path='/user/:userId?'
      />
      <AuthenticatedRoute
        component={TodoListView}
        layout={MainLayout}
        path='/todo-list'
      />
      <RouteWithLayout
        component={NotFoundView}
        layout={MinimalLayout}
        path='/not-found'
      />
      <Redirect to='/not-found' />
    </Switch>
  );
};

export default Routes;
