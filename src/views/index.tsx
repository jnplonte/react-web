import { lazy } from 'react';

export const SignInView = lazy(() => import('./sign-in/sign-in.view'));
export const AccountView = lazy(() => import('./account/account.view'));
export const DashboardView = lazy(() => import('./dashboard/dashboard.view'));
export const UserView = lazy(() => import('./user/user.view'));
export const NotFoundView = lazy(() => import('./not-found/not-found.view'));
