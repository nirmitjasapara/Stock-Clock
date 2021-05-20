import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section } from "../../components/Utils/Utils";
import "./LoginPage.css";
import {Helmet} from "react-helmet";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/home";
    history.push(destination);
  };

  render() {
    return (
      <main className="login-page-main">
        <Helmet>
                <title>Stock Clock - Login</title>
                <meta name="description" content="Login and start managing your stocks on Stock Clock." />
        </Helmet>
        <Section className="LoginPage">
          <h2>Login</h2>
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        </Section>
      </main>
    );
  }
}
