import { lazy } from 'react';

export const UserTable = lazy(() => import('./user-table/user-table.component'));
export const UserToolbar = lazy(() => import('./user-toolbar/user-toolbar.component'));
export const SearchInput = lazy(() => import('./search-input/search-input.component'));
export const UserForm = lazy(() => import('./user-form/user-form.component'));
