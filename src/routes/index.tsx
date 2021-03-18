import React, { Suspense } from 'react';

import { Redirect, Switch } from 'react-router-dom';

import { LayoutRoute, AuthenticatedRoute, UnAuthenticatedRoute } from '../components';
import { MainLayout, MinimalLayout } from '../layouts';

import { SignInView, DashboardView, NotFoundView, AccountView, UserView } from '../views';

const Routes = () => {
	return (
		<Suspense fallback={<div></div>}>
			<Switch>
				<UnAuthenticatedRoute exact component={SignInView} layout={MinimalLayout} path="/" />
				<AuthenticatedRoute component={AccountView} layout={MainLayout} path="/account" />
				<AuthenticatedRoute component={DashboardView} layout={MainLayout} path="/dashboard" />
				<AuthenticatedRoute component={UserView} layout={MainLayout} path="/user/:userId?" />
				<LayoutRoute component={NotFoundView} layout={MinimalLayout} path="/not-found" />
				<Redirect to="/not-found" />
			</Switch>
		</Suspense>
	);
};

export default Routes;
