// Note: This is probably an overloaded class.... TODO move the store creation to index.js
// Redux
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../reducers/RootReducer';
import { checkSessionStatus } from '../actions/AuthActions';
import { linkSocketToStore, registerToUniversalTodo } from '../utilities/ServerSocket';

// React + React Router
import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

// views (containers)
import App from './App';

//front end components
import MainSignUpPage from './front/MainSignUpPage';
import UserProfilePage from './front/UserProfilePage';
import StaticPages from './front/StaticPages';
import HomePage from './front/HomePage';
import UserSettings from './front/UserSettings';
import DashboardPage from '../components/front/DashboardPage';
import ManageFriends from './front/ManageFriends';
import ManageRequests from './front/ManageRequests';

//backend components
import MainLoginPage from './admin/MainLoginPage';
import Dashboard from './admin/Dashboard';
import ManageCategory from './admin/ManageCategory';
import ManagePages from './admin/ManagePages';
import Pages from './admin/Pages';
import ManageUsers from './admin/ManageUsers';
import ViewProfilePage from './admin/ViewProfilePage';


// Static Pages

import SettingsPage from '../components/static_pages/SettingsPage';

//
import ResetPassword from '../components/authentication/ResetPassword';
import EditPage from '../components/admin/pages/EditPage';
// Set up store
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
  // loggerMiddleware // neat middleware that logs actions //TODO get a better logger
)(createStore);

const store = createStoreWithMiddleware(RootReducer);
linkSocketToStore(store.dispatch);
store.dispatch(checkSessionStatus());


// Set up routes
var routes = (
  <Route path="/" component={App}>
    <Route path="home" component={HomePage}/>
    <Route path="login" component={MainLoginPage} view="admin"/>
    <Route path="manage_category" component={ManageCategory} view="admin"/>
    <Route path="manage_pages" component={ManagePages} view="admin"/>
    <Route path="manage_users" component={ManageUsers} view="admin"/>
    <Route path="profile/:id" component={ViewProfilePage} view="admin"/>
    <Route path="addPage" component={Pages} view="user"/>
    <Route path="editPage/:id" component={EditPage}/>
    <Route path="dash" component={Dashboard} view="admin"/>
    <Route path="user/:id" component={UserProfilePage} view="user"/>
    <Route path="resetPassword/:token" component={ResetPassword} view="user"/>
    <Route path="pages/:slug" component={StaticPages}/>
    <Route path="dashboard" component={HomePage}/>
    <Route path="settings" component={UserSettings} view="user"/>
    <Route path="manage_friends" component={ManageFriends}/>
    <Route path="manage_requests" component={ManageRequests}/>

  </Route>


);



export default class Root extends Component {

  render() {
    return (
      <Provider store={store}>
		    {() => <Router history={history} children={routes}/>}
		  </Provider>
    );
  }
};
