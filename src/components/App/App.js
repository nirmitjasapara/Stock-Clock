import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import ApiService from '../../services/api-service';
import CustomContext from '../../contexts/CustomContext';
import Header from '../Header/Header';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import AddPage from '../../routes/AddPage/AddPage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import CompanyPage from '../../routes/CompanyPage/CompanyPage';
import HomePage from '../../routes/HomePage/HomePage';
import './App.css'

class App extends Component {
    static contextType = CustomContext

    componentDidMount() {
      this.context.clearError();
      ApiService.getFollowings()
          .catch(this.context.setError)
          .then(this.context.setFollowings)
    }
    
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
            <div className="App">
                <Route component={Header} />
                <div className="App_main">{this.renderMainRoutes()}</div>
            </div>
        );
    }
}

export default App;
