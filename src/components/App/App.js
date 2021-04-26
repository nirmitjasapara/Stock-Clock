import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import { CustomProvider } from '../../contexts/CustomContext';
import Header from '../Header/Header';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import AddPage from '../../routes/AddPage/AddPage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import HomePage from '../../routes/HomePage/HomePage';
import './App.css'

class App extends Component {
    renderMainRoutes() {
        return (
            <Switch>
                <Route
                    exact
                    path={'/'}
                    component={LandingPage}
                />
                <PublicOnlyRoute
                    path={'/login'}
                    component={LoginPage}
                />
                <PublicOnlyRoute
                    path={'/register'}
                    component={RegistrationPage}
                />
                <PrivateRoute
                    path={'/home'}
                    component={HomePage}
                />
                <PrivateRoute
                    path={'/company/:symbol'}
                    component={CompanyPage}
                />
                <PrivateRoute
                    path={'/add'}
                    component={AddPage}
                />
            </Switch>
        );
    }
    render() {
        return (
            <CustomProvider>
                <div className="App">
                    <Route component={Header} />
                    <div className="App_main">{this.renderMainRoutes()}</div>
                </div>
            </CustomProvider>
        );
    }
}

export default App;
