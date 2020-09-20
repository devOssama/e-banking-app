import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignUp from './components/auth/Register';
import SignIn from './components/auth/Login';
import Copyright from './components/layout/Footer';
import CustomAlert from './components/layout/Alert';
import BankHome from './components/bankManagement/BankHome';
import UserHome from './components/accountManagement/UserHome';
import PrivateBankRoute from './components/routing/PrivateBankRoute';
import PrivateUserRoute from './components/routing/PrivateUserRoute';

//Redux
import { LOGOUT } from './actions/types';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <CustomAlert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/Register' component={SignUp} />
            <Route exact path='/Login' component={SignIn} />
            <PrivateBankRoute exact path='/BankHome' component={BankHome} />
            <PrivateUserRoute exact path='/AccountHome' component={UserHome} />
          </Switch>
          <Copyright />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
